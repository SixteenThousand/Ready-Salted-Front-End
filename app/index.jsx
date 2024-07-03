import { Canvas } from '@react-three/fiber/native';
import { Suspense } from 'react';
import Crisp from '../components/3dModel/Crisp';
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { Float } from '@react-three/drei';

const Home = () => {
  const originX = useSharedValue(0);
  const originY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onTouchesDown((e) => {
      originX.value = e.allTouches[0].absoluteX;
      originY.value = e.allTouches[0].absoluteY;
    })
    .onTouchesCancelled((e) => {
      const diffX = originX.value - e.allTouches[0].absoluteX;
      const diffY = originY.value - e.allTouches[0].absoluteY;

      if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) console.log('left');
      if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) console.log('right');
      if (diffY > 0 && Math.abs(diffX) < Math.abs(diffY)) console.log('up');
      if (diffY < 0 && Math.abs(diffX) < Math.abs(diffY)) console.log('down');
    });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={gesture}>
        <Canvas camera={{ position: [3, 3, 3] }}>
          <directionalLight position={[1, 0, 0]} args={['white', 2]} />
          <directionalLight position={[-1, 0, 0]} args={['white', 2]} />
          <directionalLight position={[0, 0, 1]} args={['white', 2]} />
          <directionalLight position={[0, 0, -1]} args={['white', 2]} />
          <directionalLight position={[0, 1, 0]} args={['white', 15]} />
          <directionalLight position={[0, -1, 0]} args={['white', 2]} />
          <Suspense fallback={null}>
            <Float floatIntensity={3} speed={2}>
              <Crisp />
            </Float>
          </Suspense>
          <gridHelper args={[4, 2]} />
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: 'red',
  },
});
