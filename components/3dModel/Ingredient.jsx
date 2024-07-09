import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';


export default function Ingredient(props) {
  const { type, gridX, gridZ, crispX, crispZ, fallingStatus, onHit, } = props;
  const ref = useRef();
  let timeOfLastDrop = 0;
  let internalFallingStatus = 0;
  let isActive = false;
  const ACCELERATION = 0.06;
  const INITIAL_HEIGHT = 5;
  const GRID_HEIGHT = 0;
  
  useEffect(() => {
    ref.current.position.y = INITIAL_HEIGHT;
    ref.current.position.x = gridX;
    ref.current.position.z = gridZ;
    internalFallingStatus = 0;
  },[]);
  
  useFrame(({ clock }) => {
    if(isActive) {
      ref.current.position.y = INITIAL_HEIGHT - ACCELERATION *
        Math.pow(clock.getElapsedTime() - timeOfLastDrop, 2);
      ref.current.rotation.y += 0.05;
      if(ref.current.position.y < GRID_HEIGHT) {
        // reset & wait for next drop to be triggered from outside
        ref.current.position.y = INITIAL_HEIGHT;
        isActive = false;
        onHit({ position: [gridX,gridZ], type });
      }
    } else {
      // check if the "main game script" has told this ingredient to drop
      if(internalFallingStatus < fallingStatus) {
        timeOfLastDrop = clock.getElapsedTime();
        isActive = true;
        internalFallingStatus = fallingStatus;
      }
    }
  });
  
  return (<primitive
    object={type.asset.scene}
    scale={type.scale || 1.0}
    rotation={[0,0,Math.PI / 8]}
    ref={ref}
  />);
}
