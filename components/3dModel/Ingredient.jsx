import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';


export default function Ingredient(props) {
  const { type, gridX, gridZ, numDrops, } = props;
  const ref = useRef();
  let timeOfLastDrop = 0;
  let internalNumDrops = 0;
  let isActive = false;
  const ACCELERATION = 0.06;
  const INITIAL_HEIGHT = 7;
  const GRID_HEIGHT = 0;
  
  useEffect(() => {
    ref.current.position.y = INITIAL_HEIGHT;
    ref.current.position.x = gridX;
    ref.current.position.z = gridZ;
  },[]);
  
  useFrame(({ clock }) => {
    if(isActive) {
      ref.current.position.y = INITIAL_HEIGHT - ACCELERATION *
        Math.pow(clock.getElapsedTime() - timeOfLastDrop, 2);
      if(ref.current.position.y < GRID_HEIGHT) {
        // reset & wait for next drop to be triggered from outside
        ref.current.position.y = INITIAL_HEIGHT;
        isActive = false;
      }
    } else {
      // check if the "main game script" has told this ingredient to drop
      if(internalNumDrops < numDrops) {
        timeOfLastDrop = clock.getElapsedTime();
        isActive = true;
        internalNumDrops = numDrops;
      }
    }
  });
  
  return (<primitive
    object={type.asset.scene}
    scale={type.scale || 1.0}
    ref={ref}
  />);
}
