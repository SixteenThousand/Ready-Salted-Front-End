import { Canvas } from '@react-three/fiber/native';
import { Suspense } from 'react';
import Crisp from '../components/3dModel/Crisp';
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
  Directions,
  FlingGestureHandler,
} from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

const Home = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const contextX = useSharedValue(0);
  const contextY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin((e) => {
      //console.log('begin', e);
    })
    .onFinalize((e) => {
      //console.log('end', e);
      console.log('x', e.absoluteX, e.x);
      console.log('y', e.absoluteY, e.y);
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Canvas>
          <directionalLight position={[1, 0, 0]} args={['white', 2]} />
          <directionalLight position={[-1, 0, 0]} args={['white', 2]} />
          <directionalLight position={[0, 0, 1]} args={['white', 2]} />
          <directionalLight position={[0, 0, -1]} args={['white', 2]} />
          <directionalLight position={[0, 1, 0]} args={['white', 15]} />
          <directionalLight position={[0, -1, 0]} args={['white', 2]} />
          <Suspense fallback={null}>
            <Crisp />
          </Suspense>
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
