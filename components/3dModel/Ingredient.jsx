import { useGLTF } from '@react-three/drei/native';
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';


// the asset prop should be the result of require(PATH TO ASSET)
export default function Ingredient({
    asset,
    scale,
    gridX,
    gridZ,
    initialDelay, }) {
  const { scene } = useGLTF(asset);
  const ref = useRef();
  const [timeOfLastDrop, setTimeOfLastDrop] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const ACCELERATION = 0.06;
  const INITIAL_HEIGHT = 7;
  const GRID_HEIGHT = 0;
  const TIME_BETWEEN_DROPS = 2; // in seconds
  initialDelay = initialDelay || 0; // in seconds
  scale = scale || 1.0;
  
  useEffect(() => {
    setTimeout(() => {
      ref.current.position.y = INITIAL_HEIGHT;
      ref.current.position.x = gridX;
      ref.current.position.z = gridZ;
    }, 1000 * initialDelay);
  },[]);
  
  useFrame(({ clock }) => {
    if(isWaiting) {
      if(clock.getElapsedTime() > timeOfLastDrop + TIME_BETWEEN_DROPS)
        setIsWaiting(false);
    } else {
      if(ref.current.position.y < GRID_HEIGHT) {
        setIsWaiting(true);
        ref.current.position.y = INITIAL_HEIGHT;
        setTimeOfLastDrop(clock.getElapsedTime());
      } else {
        ref.current.position.y = INITIAL_HEIGHT - 
          ACCELERATION * Math.pow(clock.getElapsedTime() - timeOfLastDrop, 2);
      }
    }
  });
  
  return (<primitive
    object={scene}
    scale={scale}
    ref={ref}
  />);
}
