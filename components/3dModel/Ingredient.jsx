import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';


export default function Ingredient({
    type,
    gridX,
    gridZ,
    numResets,
    numDrops, }) {
  const ref = useRef();
  const [timeOfLastDrop, setTimeOfLastDrop] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [externalNumResets, setExternalNumResets] = useState(0);
  const [externalNumDrops, setExternalNumDrops] = useState(0);
  const ACCELERATION = 0.06;
  const INITIAL_HEIGHT = 7;
  const GRID_HEIGHT = 0;
  
  useEffect(() => {
    ref.current.position.y = INITIAL_HEIGHT;
    ref.current.position.x = gridX;
    ref.current.position.z = gridZ;
  },[]);
  
  function reset(time) {
    console.log("We tried to reset!"); // debug
    // reset component & wait for next drop to be triggered from outside
    ref.current.position.y = INITIAL_HEIGHT;
    setTimeOfLastDrop(time);
    setIsActive(false);
  }
  
  useFrame(({ clock }) => {
    if(isActive) {
      ref.current.position.y = INITIAL_HEIGHT - ACCELERATION *
        Math.pow(clock.getElapsedTime() - timeOfLastDrop, 2);
      if(ref.current.position.y < GRID_HEIGHT) reset(clock.getElapsedTime());
      if(externalNumResets < numResets) {
        setExternalNumResets(numResets);
        reset(clock.getElapsedTime());
      }
    } else if(externalNumDrops < numDrops) {
      console.log("We tried to drop the cheese!"); // debug
      setIsActive(true);
      setExternalNumDrops(numDrops);
    }
  });
  
  return (<primitive
    object={type.asset.scene}
    scale={type.scale || 1.0}
    ref={ref}
    style={{ opacity: (isActive ? 1 : 0) }}
  />);
}
