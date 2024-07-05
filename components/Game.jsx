import { Canvas } from '@react-three/fiber/native';
import { useState, Suspense } from 'react';
import { Float } from '@react-three/drei';
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Crisp from './3dModel/Crisp';
import Ingredient from './3dModel/Ingredient';
import { animated, useSpring } from '@react-spring/three';
import { useGLTF } from '@react-three/drei/native';
import { View, Button } from 'react-native';


export const Game = () => {
  const [crispX, setCrispX] = useState(0);
  const [crispZ, setCrispZ] = useState(0);
  const [touchDownX, setTouchDownX] = useState(0);
  const [touchDownY, setTouchDownY] = useState(0);
  const { positionX } = useSpring({ positionX: crispX });
  const { positionZ } = useSpring({ positionZ: crispZ });

  const gesture = Gesture.Pan()
    .runOnJS(true)
    .onTouchesDown((e) => {
      setTouchDownX(e.allTouches[0].absoluteX);
      setTouchDownY(e.allTouches[0].absoluteY);
    })
    .onTouchesCancelled((e) => {
      const diffX = touchDownX - e.allTouches[0].absoluteX;
      const diffY = touchDownY - e.allTouches[0].absoluteY;

      if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY) && crispX > -2)
        setCrispX(crispX - 2);
      if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY) && crispX < 2)
        setCrispX(crispX + 2);
      if (diffY > 0 && Math.abs(diffX) < Math.abs(diffY) && crispZ > -2)
        setCrispZ(crispZ - 2);
      if (diffY < 0 && Math.abs(diffX) < Math.abs(diffY) && crispZ < 2)
        setCrispZ(crispZ + 2);
    });
  
  // falling ingredient management
  const TYPES = [
    {
      name: "cheese",
      asset: useGLTF(require('../assets/models/Cheese.glb')),
      scale: 0.3,
    },
    // {
    //   name: 'salt',
    //   asset: useGLTF(require('../assets/models/Salt_Shaker.glb')),
    //   scale: 1.0,
    // }
  ];
  const [ingredientControls, setIngredientControls] = useState({
    type: TYPES[0],
    numResets: 0,
    numDrops: 0,
  });


  return (<>
    <GestureHandlerRootView>
      <GestureDetector gesture={gesture}>
        <Canvas camera={{ position: [0, 3, 5] }}>
          <directionalLight position={[1, 0, 0]} args={['white', 2]} />
          <directionalLight position={[-1, 0, 0]} args={['white', 2]} />
          <directionalLight position={[0, 0, 1]} args={['white', 2]} />
          <directionalLight position={[0, 0, -1]} args={['white', 2]} />
          <directionalLight position={[0, 1, 0]} args={['white', 15]} />
          <directionalLight position={[0, -1, 0]} args={['white', 2]} />
          <Suspense fallback={null}>
            <Float floatIntensity={3} speed={2}>
              <animated.group position-x={positionX} position-z={positionZ}>
                <Crisp />
              </animated.group>
            </Float>
            <Ingredient
              gridX={0}
              gridZ={0}
              type={ingredientControls.type}
              numResets={ingredientControls.numResets}
              numDrops={ingredientControls.numDrops}
            />
          </Suspense>
          <gridHelper args={[4, 2]} />
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
    <View>
      <Button
        title='Reset Ingredient'
        onClick={() => {
          setIngredientControls((currentIngredientsControls) => {
            return {
              ...currentIngredientsControls,
              numResets: currentIngredientsControls.numResets + 1,
              numDrops: currentIngredientsControls.numDrops + 1,
            };
          });
        }}
      />
        
    </View>
  </>);
};
