import { useGLTF } from '@react-three/drei/native';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated, config } from '@react-spring/three';

function Model() {
  const { scene } = useGLTF(require('../../assets/models/crisp.glb'));
  const modelRef = useRef();
  
  // react-spring stuff
  const [active,setActive] = useState(false);
  const { scale } = useSpring({
    scale: active ? 2 : 1,
    config: config.wobbly,
  });
  
  
  useFrame(({ clock }) => {
    modelRef.current.rotation.y = clock.getElapsedTime();
  });
  
  return <animated.primitive
    object={scene}
    ref={modelRef}
    scale={scale}
    onClick={() => {
      setActive((currentlyActive) => !currentlyActive);
    }}
  />;
}

export default function Crisp() {
  return <Model />;
}
