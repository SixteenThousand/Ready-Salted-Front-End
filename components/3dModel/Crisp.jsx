import { useGLTF } from '@react-three/drei/native';

function Model() {
  const { scene } = useGLTF(require('../../assets/models/crisp.glb'));
  return <primitive object={scene} rotation={[0, Math.PI / 2, 0]} />;
}

export default function Crisp() {
  return <Model />;
}
