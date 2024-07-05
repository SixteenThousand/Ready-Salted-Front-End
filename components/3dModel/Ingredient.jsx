import { useGLTF } from '@react-three/drei/native';
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';


export default function Ingredient({ gridInfo }) {
  const TYPES = [
    {
      name: 'cheese',
      asset: useGLTF(require('../../assets/models/Cheese.glb')),
      scale: 0.5,
    },
    {
      name: 'salt',
      asset: useGLTF(require('../../assets/models/Salt_Shaker.glb')),
      scale: 1.0,
    },
  ];
  const ref = useRef();
  const [type, setType] = useState(TYPES[0]);
  const ACCELERATION = 0.06;
  const INITIAL_HEIGHT = 7;
  const GRID_HEIGHT = 0;
  const TIME_BETWEEN_DROPS = 2;
  
  const [gridWidth, gridDivisions] = gridInfo;
  const gridTopLeftCoord = - gridWidth / 2;
  const gridSquareSize = gridWidth / gridDivisions;
  
  useEffect(() => {
    setTimeout(() => {
      ref.current.position.y = INITIAL_HEIGHT;
      ref.current.position.x = gridTopLeftCoord + gridSquareSize *
        Math.floor(Math.random() * gridDivisions);
      ref.current.position.z = gridTopLeftCoord + gridSquareSize *
        Math.floor(Math.random() * gridDivisions);
    }, 1000 * TIME_BETWEEN_DROPS);
  },[type]);
  
  useFrame(({ clock }) => {
    if(ref.current.position.y < GRID_HEIGHT) {
      setType(TYPES[Math.floor(Math.random() * TYPES.length)]);
        // this should trigger useEffect
    } else {
      ref.current.position.y = INITIAL_HEIGHT - (ACCELERATION *
        Math.pow(clock.getElapsedTime(), 2));
    }
  });
  
  return (<primitive
    object={type.asset.scene}
    scale={type.scale}
    ref={ref}
  />);
}
