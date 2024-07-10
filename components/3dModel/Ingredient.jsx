import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';

export default function Ingredient(props) {
  const { type, gridX, gridZ, fallingStatus, onHit } = props;
  const ref = useRef();
  let timeOfLastDrop = 0;
  let internalFallingStatus = 0;
  let isActive = false;
  // const ACCELERATION = 0.40;
  const [ingredientY, setIngredientY] = useState(null);
  const INITIAL_HEIGHT = 5;
  const GRID_HEIGHT = 0;
  const { animatedIngredientY } = useSpring({
    animatedIngredientY: ingredientY,
    config: { delay: 0, duration: 1500 },
  });

  useEffect(() => {
    setIngredientY(INITIAL_HEIGHT);
    setTimeout(() => {
      setIngredientY(0);
    }, 500);
    internalFallingStatus = 0;
  }, []);

  useFrame(({ clock }) => {
    if (isActive) {
      // ref.current.position.y = initialHeight - ACCELERATION *
      // Math.pow(clock.getElapsedTime() - timeOfLastDrop, 2);
      ref.current.rotation.y += 0.05;
      if (ref.current.position.y <= GRID_HEIGHT) {
        // reset & wait for next drop to be triggered from outside
        ref.current.position.y = -1000;
        isActive = false;
        onHit({ position: [gridX, gridZ], type });
      }
    } else {
      // check if the "main game script" has told this ingredient to drop
      if (internalFallingStatus < fallingStatus) {
        timeOfLastDrop = clock.getElapsedTime();
        isActive = true;
        internalFallingStatus = fallingStatus;
      }
    }
  });

  return (
    <animated.primitive
      object={type.asset.scene}
      position-x={gridX}
      position-z={gridZ}
      position-y={animatedIngredientY}
      scale={type.scale || 1.0}
      rotation={[0, 0, Math.PI / 8]}
      ref={ref}
    />
  );
}
