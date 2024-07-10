import { useGLTF } from '@react-three/drei/native';
import { useMemo } from 'react';

export default function Hand({ currentType }) {
  console.log(currentType.name);
  const { scene } = useGLTF(crispModel(currentType.name));
  return <primitive object={scene} rotation={[0, -Math.PI / 2, 0]} />;
}

const crispModel = (type) => {
  switch (type) {
    case 'salt':
      return require('../../assets/models/SaltCrisps.glb');
    case 'cheese':
      return require('../../assets/models/CheeseCrisps.glb');
    case 'chicken':
      return require('../../assets/models/ChickenCrisps.glb');
    case 'bacon':
      return require('../../assets/models/BaconCrisps.glb');
    case 'vinegar':
      return require('../../assets/models/VinegarCrisps.glb');
    case 'prawn':
      return require('../../assets/models/PrawnCrisps.glb');
  }
};
