import { useGLTF } from '@react-three/drei/native';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function Model() {
  const { scene } = useGLTF(require('../../assets/models/crisp.glb'));
  const modelRef = useRef();
  
  useFrame(({ clock }) => {
    modelRef.current.rotation.y = clock.getElapsedTime();
  });
  
  return <primitive object={scene} ref={modelRef} />;
}

export default function Crisp() {
  return <Model />;
}
