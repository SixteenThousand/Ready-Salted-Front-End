import { Canvas } from '@react-three/fiber/native';
import useControls from 'r3f-native-orbitcontrols';
import { Suspense } from 'react';
import Crisp from '../components/3dModel/Crisp';
import HomeScreen from '../screens/home';

const Home = () => {
  const [OrbitControls, events] = useControls();
  return (
    <>
    <HomeScreen />
    {/* <Canvas>
      <OrbitControls enablePan={false} enableZoom={false} />
      <directionalLight position={[1, 0, 0]} args={['white', 2]} />
      <directionalLight position={[-1, 0, 0]} args={['white', 2]} />
      <directionalLight position={[0, 0, 1]} args={['white', 2]} />
      <directionalLight position={[0, 0, -1]} args={['white', 2]} />
      <directionalLight position={[0, 1, 0]} args={['white', 15]} />
      <directionalLight position={[0, -1, 0]} args={['white', 2]} />
      <Suspense fallback={null}>
        <Crisp />
      </Suspense>
    </Canvas> */}
    </>
  );
};

export default Home;