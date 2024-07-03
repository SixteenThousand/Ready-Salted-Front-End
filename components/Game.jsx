import { Canvas } from '@react-three/fiber/native';
import { useState, Suspense } from 'react';
import { Float } from '@react-three/drei';
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Crisp from './3dModel/Crisp';
import { animated, useSpring } from '@react-spring/three';

export const Game = () => {
  const [crispX, setCrispX] = useState(0);
  const [crispZ, setCrispZ] = useState(0);
  const [touchDownX, setTouchDownX] = useState(0);
  const [touchDownY, setTouchDownY] = useState(0);
  const { positionX } = useSpring({ positionX: crispX });
  const { positionZ } = useSpring({ positionZ: crispZ });

  const gesture = Gesture.Pan()
    .runOnJS(true)
    .onTouchesDown((e) => {
      setTouchDownX(e.allTouches[0].absoluteX);
      setTouchDownY(e.allTouches[0].absoluteY);
      console.log(' ');
      console.log('touches down');
    })
    .onTouchesUp((e) => {
      console.log('touches up');
      const diffX = touchDownX - e.allTouches[0].absoluteX;
      const diffY = touchDownY - e.allTouches[0].absoluteY;

      if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY) && crispX > -2)
        setCrispX(crispX - 2);
      if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY) && crispX < 2)
        setCrispX(crispX + 2);
      if (diffY > 0 && Math.abs(diffX) < Math.abs(diffY) && crispZ > -2)
        setCrispZ(crispZ - 2);
      if (diffY < 0 && Math.abs(diffX) < Math.abs(diffY) && crispZ < 2)
        setCrispZ(crispZ + 2);
    })
    .onTouchesCancelled((e) => {
      console.log('touches cancel');
      const diffX = touchDownX - e.allTouches[0].absoluteX;
      const diffY = touchDownY - e.allTouches[0].absoluteY;

      if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY) && crispX > -2)
        setCrispX(crispX - 2);
      if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY) && crispX < 2)
        setCrispX(crispX + 2);
      if (diffY > 0 && Math.abs(diffX) < Math.abs(diffY) && crispZ > -2)
        setCrispZ(crispZ - 2);
      if (diffY < 0 && Math.abs(diffX) < Math.abs(diffY) && crispZ < 2)
        setCrispZ(crispZ + 2);
    });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={gesture}>
        <Canvas camera={{ position: [0, 5, 5], rotation: [-0.5, 0, 0] }}>
          <directionalLight position={[1, 0, 0]} args={['white', 2]} />
          <directionalLight position={[-1, 0, 0]} args={['white', 2]} />
          <directionalLight position={[0, 0, 1]} args={['white', 2]} />
          <directionalLight position={[0, 0, -1]} args={['white', 2]} />
          <directionalLight position={[0, 1, 0]} args={['white', 15]} />
          <directionalLight position={[0, -1, 0]} args={['white', 2]} />
          <Suspense fallback={null}>
            <Float floatIntensity={3} speed={2}>
              <animated.group position-x={positionX} position-z={positionZ}>
                <Crisp />
              </animated.group>
            </Float>
          </Suspense>
          <gridHelper args={[4, 2]} />
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};
