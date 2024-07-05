import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';


export default function Ingredient({ dots, onHit }) {
  const [lastHitTime, setLastHitTime] = useState(0);
  const ref = useRef();
  const ACCELERATION = 0.06;
  const INITIAL_HEIGHT = 7;
  const GRID_HEIGHT = 0;
  const TIME_BETWEEN_DROPS = 5;
  const TYPES = [
    {
      name: "salt",
      asset: useGLTF(require("../../assets/models/Salt_Shaker.glb")),
      scale: 1.0,
    },
    {
      name: "cheese",
      asset: useGLTF(require('../../assets/models/Cheese.glb')),
      scale: 0.5,
    },
  ];
      
  
  useEffect(() => {
    setTimeout(() => {
      ref.current.position.y = INITIAL_HEIGHT;
      [ref.current.position.x, ref.current.position.x] =
        dots[Math.floor(Math.random() * dots.length)];
    }, 1000 * TIME_BETWEEN_DROPS);
  },[]);
  
  useFrame(({ clock }) => {
    if(ref.current.position.y < GRID_HEIGHT) {
      setLastHitTime(clock.getElapsedTime());
      ref.current.position.y = INITIAL_HEIGHT;
      const gridPosition = dots[Math.floor(Math.random() * dots.length)];
      [ref.current.position.x, ref.current.position.x] = gridPosition;
      setType(TYPES[Math.floor(Math.random() * TYPES.length)]);
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
