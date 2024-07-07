import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';


export default function Ingredient({
    type,
    gridX,
    gridZ,
    numDrops, }) {
  const ref = useRef();
  const [opacity, setOpacity] = useState(1);
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
        console.log("We got to the grid!",timeOfLastDrop); // debug
        isActive = false;
        // setOpacity(0);
      }
    } else {
      // check if the "main game script" has told this ingredient to drop
      if(internalNumDrops < numDrops) {
        timeOfLastDrop = clock.getElapsedTime();
        console.log("We tried to drop the cheese!", ref.current.position.y, timeOfLastDrop); // debug
        // setOpacity(1);
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
