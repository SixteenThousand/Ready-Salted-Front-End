import { Canvas } from '@react-three/fiber/native';
import { useState, Suspense } from 'react';
import { Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import Crisp from './3dModel/Crisp';
import Hand from './3dModel/Hand';
import Ingredient from './3dModel/Ingredient';
import { animated, useSpring } from '@react-spring/three';


export default function GameCanvas(props) {
  const {
    crispX,
    crispZ,
    handHitHandler,
    setContents,
    INGREDIENT_TYPES,
  } = props;
  const { animatedCrispX } = useSpring({ animatedCrispX: crispX });
  const { animatedCrispZ } = useSpring({ animatedCrispZ: crispZ });
  const [handX, setHandX] = useState(null);
  const [handZ, setHandZ] = useState(null);
  const [isHandActive, setIsHandActive] = useState(false);
  const dots = [
    [2, 2],
    [2, 0],
    [2, -2],
    [0, 2],
    [0, 0],
    [0, -2],
    [-2, 2],
    [-2, 0],
    [-2, -2],
  ];
  const activateHand = () => {
    setHandX(Math.floor(Math.random() * 3) * 2 - 2);
    setHandZ(Math.floor(Math.random() * 3) * 2 - 2);
    setIsHandActive(true);
  };
  const ingredientHitHandlerFactory = (ingredientIndex) => {
    return (ingredientType) => {
      for (let i = 0; i < contents.length; i++) {
        if (!contents[i]) {
          const newContents = [...contents];
          newContents[i] = ingredientType.name;
          setContents(newContents);
          break;
        }
      }
      setFallingIngredientsInfo((currentIngredientsInfo) => {
        const result = [...currentIngredientsInfo];
        result[ingredientIndex] = null;
        return result;
      });
    };
  };
  const [fallingIngredientsInfo, setFallingIngredientsInfo] = useState([ null, null, null ]);
  const [totalNumDrops, setTotalNumDrops] = useState(0);
  let timeOfNextDrop = 0; 


  /* useFrame(({ clock }) => {
    if(clock.getElapsedTime() > timeOfNextDrop) {
      timeOfNextDrop += 3;
      // code here runs every 3 seconds (approx.)
      setFallingIngredientsInfo((currentIngredientsInfo) => {
        const result = [...currentIngredientsInfo];
        for(let i=0; i<result.length; i++) {
          if(result[i] === null) {
            result[i] = {
              type: INGREDIENT_TYPES[Math.floor(Math.random() * INGREDIENT_TYPES.length)],
              position: dots[Math.floor(Math.random() * dots.length)],
              fallingStatus: 0,
            };
            break;
          }
        }
        return result;
      });
    }
  }); */
  

  
  return (<>
    <Canvas camera={{ position: [0, 2, 7], rotation: [0, 0, 0] }}>
      {/* <Canvas
      camera={{ position: [0, 10, 0], rotation: [-Math.PI / 2, 0, 0] }}
    > */}
      <directionalLight position={[1, 0, 0]} args={['white', 2]} />
      <directionalLight position={[-1, 0, 0]} args={['white', 2]} />
      <directionalLight position={[0, 0, 1]} args={['white', 2]} />
      <directionalLight position={[0, 0, -1]} args={['white', 2]} />
      <directionalLight position={[0, 1, 0]} args={['white', 15]} />
      <directionalLight position={[0, -1, 0]} args={['white', 2]} />
      <Suspense fallback={null}>
        <Float floatIntensity={3} speed={2}>
          <animated.group
            position-x={animatedCrispX}
            position-z={animatedCrispZ}
          >
            <Crisp />
          </animated.group>
        </Float>
        {/* <Ingredient onHit={handleIngredientHit} dots={dots} /> */}
      </Suspense>
      {fallingIngredientsInfo.map((info,index) => {
        return (<Ingredient
          crispX={crispX}
          crispZ={crispZ}
          gridX={info ? info.position[0] : 0}
          gridZ={info ? info.position[1] : 0}
          type={info ? info.type : INGREDIENT_TYPES[0]}
          onHit={ingredientHitHandlerFactory(index)}
          fallingStatus={info ? info.fallingStatus : 0}
          key={index}
        />);
      })}
      {isHandActive ? (
        <Hand
          handX={handX}
          handZ={handZ}
          crispX={animatedCrispX}
          crispZ={animatedCrispZ}
          setIsHandActive={setIsHandActive}
          handHitHandler={handHitHandler}
        />
      ) : null}
      <gridHelper args={[4, 2, 'white', 'white']} />
      {dots.map((dot, index) => {
        return (
          <mesh key={index} position={[dot[0], 0, dot[1]]}>
            <sphereGeometry args={[0.05]} />
            <meshStandardMaterial
              color={
                dot[0] === handX && dot[1] === handZ && isHandActive
                  ? 'black'
                  : 'white'
              }
            />
          </mesh>
        );
      })}
    </Canvas>
    </>);
}
