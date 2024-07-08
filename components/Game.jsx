import {
  Platform,
  StyleSheet,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import { useState, useEffect, Suspense } from 'react';
import { Float } from '@react-three/drei';
import { useGLTF } from '@react-three/drei/native';
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Crisp from './3dModel/Crisp';
import Hand from './3dModel/Hand';
// import Ingredient from './3dModel/Ingredient';
import { animated, useSpring } from '@react-spring/three';




const backgroundImage = require('../assets/images/3d-rendering-cartoon-welcome-door.jpg');

const icons = {
  salt: require('../assets/icons/salt.png'),
  cheese: require('../assets/icons/cheese.png'),
  onion: require('../assets/icons/onion.png'),
  chicken: require('../assets/icons/chicken.png'),
  bacon: require('../assets/icons/bacon.png'),
};

export const Game = () => {
  const [crispX, setCrispX] = useState(0);
  const [crispZ, setCrispZ] = useState(0);
  const { animatedCrispX } = useSpring({ animatedCrispX: crispX });
  const { animatedCrispZ } = useSpring({ animatedCrispZ: crispZ });
  const [touchDownX, setTouchDownX] = useState(0);
  const [touchDownY, setTouchDownY] = useState(0);
  const [isHandActive, setIsHandActive] = useState(false);
  const [handX, setHandX] = useState(null);
  const [handZ, setHandZ] = useState(null);
  const [contents, setContents] = useState([null, null, null, null, null]);
  const contentTypes = ['salt', 'cheese', 'onion', 'chicken', 'bacon'];
  const [currentType, setCurrentType] = useState(
    contentTypes[Math.floor(Math.random() * 5)]
  );
  const [score, setScore] = useState(0);


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

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onTouchesDown((e) => {
      startTouch(e, 'down');
    })
    .onTouchesUp((e) => {
      moveCrisp(e, 'up');
    })
    .onTouchesCancelled((e) => {
      moveCrisp(e, 'cancel');
    });

  const longPress = Gesture.LongPress()
    .runOnJS(true)
    .minDuration(0)
    .onTouchesDown((e) => {
      startTouch(e, 'down');
    })
    .onTouchesCancelled((e) => {
      moveCrisp(e, 'cancel');
    });

  const startTouch = (e, type) => {
    setTouchDownX(e.allTouches[0].absoluteX);
    setTouchDownY(e.allTouches[0].absoluteY);
  };

  const moveCrisp = (e, type) => {
    const diffX = touchDownX - e.allTouches[0].absoluteX;
    const diffY = touchDownY - e.allTouches[0].absoluteY;
    if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY) && crispX > -2)
      setCrispX(crispX - 2);
    else if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY) && crispX < 2)
      setCrispX(crispX + 2);
    else if (diffY > 0 && Math.abs(diffX) < Math.abs(diffY) && crispZ > -2)
      setCrispZ(crispZ - 2);
    else if (diffY < 0 && Math.abs(diffX) < Math.abs(diffY) && crispZ < 2)
      setCrispZ(crispZ + 2);
  };

  const addContent = () => {
    for (let i = 0; i < contents.length; i++)
      if (!contents[i]) {
        const newContents = [...contents];
        newContents[i] = contentTypes[Math.floor(Math.random() * 5)];
        setContents(newContents);
        break;
      }
  };

  const emptyContents = () => {
    setContents([null, null, null, null, null]);
  };

  const activateHand = () => {
    setHandX(Math.floor(Math.random() * 3) * 2 - 2);
    setHandZ(Math.floor(Math.random() * 3) * 2 - 2);
    setIsHandActive(true);
  };

  const handHitHandler = () => {
    emptyContents();
    let newScore = 0;
    for (let i = 0; i < contents.length; i++)
      if (contents[i] === currentType) newScore++;
    setScore((score) => score + newScore);
  };

  const iconColor = (content) => {
    if (!content) return styles.white;
    if (content === currentType) return styles.green;
    if (content !== currentType) return styles.red;
  };

  return (
    <GestureHandlerRootView style={styles.canvas}>
      <ImageBackground source={backgroundImage} style={styles.image}>
        <Text style={styles.highScore}>Score: {score}</Text>
        <View style={styles.circleContainer}>
          {contents.map((content, index) => {
            return (
              <View key={index} style={iconColor(content)}>
                <ImageBackground source={icons[content]} style={styles.icon} />
              </View>
            );
          })}
        </View>
        <GestureDetector gesture={Platform.OS === 'ios' ? pan : longPress}>
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
        </GestureDetector>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  highScore: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 24,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  circleContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    display: 'flex',
    gap: 10,
  },
  white: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  green: {
    width: 50,
    height: 50,
    backgroundColor: '#CCFF00',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  red: {
    width: 50,
    height: 50,
    backgroundColor: '#ff3300',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  icon: {
    width: 35,
    height: 35,
  },
  addContent: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: '#CCFF00',
    borderRadius: 50,
    top: 20,
    left: 20,
  },
  emptyContents: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 50,
    top: 20,
    left: 80,
  },
  activateHand: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    top: 20,
    left: 140,
  },
});
