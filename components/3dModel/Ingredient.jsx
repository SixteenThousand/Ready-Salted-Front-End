import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';


export default function Ingredient({ gridPosition, type, onHit }) {
  const [lastHitTime, setLastHitTime] = useState(0);
  const ref = useRef();
  const ACCELERATION = 0.06;
  const INITIAL_HEIGHT = 7;
  const GRID_HEIGHT = 0;
  const TIME_BETWEEN_DROPS = 2;
  
  useEffect(() => {
    setTimeout(() => {
      ref.current.position.y = INITIAL_HEIGHT;
      ref.current.position.x = gridPosition[0];
      ref.current.position.z = gridPosition[1];
    }, 1000 * TIME_BETWEEN_DROPS);
  },[]);
  
  useFrame(({ clock }) => {
    if(ref.current.position.y < GRID_HEIGHT) {
      setLastHitTime(clock.getElapsedTime());
      ref.current.position.y = INITIAL_HEIGHT;
      onHit({ ingredientType: type.name, gridPosition });
    } else {
      ref.current.position.y = INITIAL_HEIGHT - (ACCELERATION *
        Math.pow(clock.getElapsedTime() - lastHitTime, 2));
    }
  });
  
  return (<primitive
    object={type.asset.scene}
    scale={type.scale}
    ref={ref}
  />);
}
