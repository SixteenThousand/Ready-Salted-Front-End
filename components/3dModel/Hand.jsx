import { useGLTF } from '@react-three/drei/native';
import { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';

export default function Hand(props) {
  const { crispX, crispZ, setIsHandActive } = props;
  const { scene, nodes, materials } = useGLTF(
    require('../../assets/models/hand.glb')
  );
  const [handY, setHandY] = useState(null);
  const [handX, setHandX] = useState(null);
  const [handZ, setHandZ] = useState(null);
  const { animatedHandY } = useSpring({
    animatedHandY: handY,
    config: { delay: 1000, duration: 3000 },
    onRest: () => {
      setTimeout(() => {
        setIsHandActive(false);
      }, 1000);
    },
  });

  useEffect(() => {
    setHandX(Math.floor(Math.random() * 3) * 2 - 2);
    setHandZ(Math.floor(Math.random() * 3) * 2 - 2);
    setHandY(5);
    setTimeout(() => {
      setHandY(0);
    }, 1000);
  }, []);

  useFrame(() => {
    if (
      Number(JSON.stringify(crispX)) === handX &&
      Number(JSON.stringify(crispZ)) === handZ &&
      Number(JSON.stringify(animatedHandY)) <= 0
    ) {
      console.log('');
      console.log('Hit!');
      setIsHandActive(false);
    }
  });

  return (
    <animated.group position-y={animatedHandY}>
      <primitive
        object={scene}
        scale={0.05}
        rotation={[0, 0, Math.PI]}
        position={[handX, 0, handZ]}
        children-0-material-opacity={0.5}
      />
    </animated.group>
  );
}
