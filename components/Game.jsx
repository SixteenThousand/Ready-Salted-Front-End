import { Platform, StyleSheet, ImageBackground } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import { useState, Suspense } from 'react';
import { Float } from '@react-three/drei';
import {
  Directions,
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Crisp from './3dModel/Crisp';
import Ingredient from './3dModel/Ingredient';
import { animated, useSpring } from '@react-spring/three';
const image = require('../assets/images/factory.jpg');

export const Game = () => {
  const [crispX, setCrispX] = useState(0);
  const [crispZ, setCrispZ] = useState(0);
  const [touchDownX, setTouchDownX] = useState(0);
  const [touchDownY, setTouchDownY] = useState(0);
  const { positionX } = useSpring({ positionX: crispX });
  const { positionZ } = useSpring({ positionZ: crispZ });

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onTouchesDown((e) => {
      startTouch(e, 'down');
    })
    .onTouchesUp((e) => {
      moveCrisp(e, 'up');
    })
    .onTouchesCancelled((e) => {
      moveCrisp(e, 'cancel');
    });

  const longPress = Gesture.LongPress()
    .runOnJS(true)
    .minDuration(0)
    .onTouchesDown((e) => {
      startTouch(e, 'down');
    })
    .onTouchesUp((e) => {
      moveCrisp(e, 'up');
    })
    .onTouchesCancelled((e) => {
      moveCrisp(e, 'cancel');
    });

  const startTouch = (e, type) => {
    console.log('');
    console.log(Platform.OS);
    console.log(type);
    setTouchDownX(e.allTouches[0].absoluteX);
    setTouchDownY(e.allTouches[0].absoluteY);
  };

  const moveCrisp = (e, type) => {
    console.log(type);
    const diffX = touchDownX - e.allTouches[0].absoluteX;
    const diffY = touchDownY - e.allTouches[0].absoluteY;
    if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY) && crispX > -2)
      setCrispX(crispX - 2);
    else if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY) && crispX < 2)
      setCrispX(crispX + 2);
    else if (diffY > 0 && Math.abs(diffX) < Math.abs(diffY) && crispZ > -2)
      setCrispZ(crispZ - 2);
    else if (diffY < 0 && Math.abs(diffX) < Math.abs(diffY) && crispZ < 2)
      setCrispZ(crispZ + 2);
  };

  return (
    <GestureHandlerRootView style={styles.canvas}>
      <ImageBackground source={image} style={styles.image}>
        <GestureDetector gesture={Platform.OS === 'ios' ? pan : longPress}>
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
              <Ingredient
                gridX={0}
                gridZ={0}
                asset={require('../assets/models/Cheese.glb')}
                scale={0.2}
              />
            </Suspense>
            <gridHelper args={[4, 2, 'white', 'white']} />
            <mesh
              position={[-2, 0, -2]}
              // onClick={() => {
              //   setCrispX(crispX - 2);
              // }}
            >
              <sphereGeometry args={[0.6]} />
              <meshStandardMaterial opacity={0.2} transparent />
            </mesh>

            <mesh
              position={[2, 0, -2]}
              // onClick={() => {
              //   setCrispX(crispX + 2);
              // }}
            >
              <sphereGeometry args={[0.6]} />
              <meshStandardMaterial opacity={0.2} transparent />
            </mesh>
          </Canvas>
        </GestureDetector>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
