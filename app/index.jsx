import { Suspense, useState, } from 'react';
import { View, Text, Button, Stylesheet, } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import useControls from 'r3f-native-orbitcontrols';
import { animated, useSpring, } from '@react-spring/native';
import Crisp from '../components/3dModel/Crisp';

const Home = () => {
  const [OrbitControls, events] = useControls();
  const [fooState, setFooState] = useState(false);
  
  function toggleFooState() {
    setFooState((currentFooState) => !currentFooState);
    springsApi.start({
      from: { width: 50 },
      to: { width: 200 },
    });
  }
  
  const [springs, springsApi] = useSpring(() => ({
    from: { width: 50 },
  }));

  return (<>
    <Canvas>
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
    </Canvas>
    <View>
      <animated.View style={{
        width: 50,
        height: 50,
        backgroundColor:  'red',
        ...springs,
      }}>
      </animated.View>
      <Button onPress={toggleFooState} title="Click me! I do things." color="blue" />
      <Text>{fooState ? 'foo!' : 'no foo!'}</Text>
    </View>
  </>);
};

export default Home;
