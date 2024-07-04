import { useGLTF } from '@react-three/drei/native';

function Model() {
  const { scene } = useGLTF(require('../../assets/models/crisp.glb'));
  
  return <primitive
    object={scene}
  />;
}

export default function Crisp() {
  return <Model />;
}
