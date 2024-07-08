import { useGLTF } from '@react-three/drei/native';
import { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';

export default function Hand(props) {
  const { handX, handZ, crispX, crispZ, setIsHandActive, setScore } = props;
  const { nodes, materials } = useGLTF(require('../../assets/models/hand.glb'));
  materials.lambert2SG.opacity = 1;
  const [handY, setHandY] = useState(null);
  let isHit = false;
  const { animatedHandY } = useSpring({
    animatedHandY: handY,
    config: { delay: 1000, duration: 3000 },
    onRest: () => {
      setTimeout(() => {
        setIsHandActive(false);
        if (isHit) setScore((score) => score + 5);
      }, 1000);
    },
  });

  useEffect(() => {
    setHandY(5);
    setTimeout(() => {
      setHandY(0);
    }, 1000);
  }, []);

  useFrame(() => {
    console.log(crispX, crispZ, handX, handZ);
    if (
      !isHit &&
      Number(JSON.stringify(crispX)) === handX &&
      Number(JSON.stringify(crispZ)) === handZ &&
      Number(JSON.stringify(animatedHandY)) <= 0
    ) {
      console.log('Hit!');
      isHit = true;
      materials.lambert2SG.opacity = 0;
    }
  });

  return (
    <animated.group
      position-x={handX}
      position-y={animatedHandY}
      position-z={handZ}
    >
      <mesh
        position={[0.75, -0.05, 0.25]}
        rotation={[Math.PI / 2, Math.PI, 0]}
        scale={0.05}
        geometry={nodes.hands.geometry}
        material={materials.lambert2SG}
        material-transparent
      />
    </animated.group>
  );
}
