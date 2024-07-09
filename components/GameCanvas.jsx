import { useState, Suspense, useRef } from 'react';
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
    contents,
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
    return ({ position, type }) => {
      if (
        position[0] === Number(JSON.stringify(crispX)) &&
        position[1] === Number(JSON.stringify(crispZ))
      ) {
        // add stuff to crisp packet contents
        for (let i = 0; i < contents.length; i++) {
          if (!contents[i]) {
            const newContents = [...contents];
            newContents[i] = type.name;
            setContents(newContents);
            break;
          }
        }
      }
      setFallingIngredientsInfo((currentIngredientsInfo) => {
        const result = [...currentIngredientsInfo];
        result[ingredientIndex] = null;
        return result;
      });
    };
  };
  const [fallingIngredientsInfo, setFallingIngredientsInfo] = useState([
    null,
    null,
    null,
  ]);
  let numDrops = useRef(0);
  let timeOfNextDrop = useRef(0);

  useFrame(({ clock }) => {
    if (clock.getElapsedTime() > timeOfNextDrop.current) {
      timeOfNextDrop.current += 4;
      numDrops.current++;
      if (numDrops.current % 5 !== 0)
        setFallingIngredientsInfo((currentIngredientsInfo) => {
          const result = [...currentIngredientsInfo];
          result[0] = {
            type: INGREDIENT_TYPES[
              Math.floor(Math.random() * INGREDIENT_TYPES.length)
            ],
            position: dots[Math.floor(Math.random() * dots.length)],
            fallingStatus: 1,
          };
          console.log(result);
          return result;
        });
      else activateHand();
    }
  });

  return (
    <>
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
      {fallingIngredientsInfo[0] ? (
        <Ingredient
          type={fallingIngredientsInfo[0].type}
          gridX={fallingIngredientsInfo[0].position[0]}
          gridZ={fallingIngredientsInfo[0].position[1]}
          onHit={ingredientHitHandlerFactory(0)}
          fallingStatus={fallingIngredientsInfo[0].fallingStatus}
        />
      ) : null}
      {isHandActive ? (
        <Hand
          handX={handX}
          setHandX={setHandX}
          handZ={handZ}
          setHandZ={setHandZ}
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
                dot[0] === (handX || fallingIngredientsInfo[0]?.position[0]) &&
                dot[1] === (handZ || fallingIngredientsInfo[0]?.position[1])
                  ? 0xff3300
                  : 'white'
              }
            />
          </mesh>
        );
      })}
    </>
  );
}
