import {
  Platform,
  StyleSheet,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import { useState, Suspense } from 'react';
import { Float } from '@react-three/drei';
import {
  Directions,
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Crisp from './3dModel/Crisp';
import Ingredient from './3dModel/Ingredient';
import { animated, useSpring } from '@react-spring/three';
const backgroundImage = require('../assets/images/3d-rendering-cartoon-welcome-door.jpg');
const saltIcon = require('../assets/icons/salt.png');
const cheeseIcon = require('../assets/icons/cheese.png');
const onionIcon = require('../assets/icons/onion.png');
const chickenIcon = require('../assets/icons/chicken.png');
const baconIcon = require('../assets/icons/bacon.png');

export const Game = () => {
  const [crispX, setCrispX] = useState(0);
  const [crispZ, setCrispZ] = useState(0);
  const [touchDownX, setTouchDownX] = useState(0);
  const [touchDownY, setTouchDownY] = useState(0);
  const { positionX } = useSpring({ positionX: crispX });
  const { positionZ } = useSpring({ positionZ: crispZ });

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

  return (
    <GestureHandlerRootView style={styles.canvas}>
      <ImageBackground source={backgroundImage} style={styles.image}>
        <Text style={styles.highScore}>Score: 0</Text>
        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            <ImageBackground source={saltIcon} style={styles.icon} />
          </View>
          <View style={styles.circle}>
            <ImageBackground source={cheeseIcon} style={styles.icon} />
          </View>
          <View style={styles.circle}>
            <ImageBackground source={onionIcon} style={styles.icon} />
          </View>
          <View style={styles.circle}>
            <ImageBackground source={chickenIcon} style={styles.icon} />
          </View>
          <View style={styles.circle}>
            <ImageBackground source={baconIcon} style={styles.icon} />
          </View>
        </View>
        <GestureDetector gesture={Platform.OS === 'ios' ? pan : longPress}>
          <Canvas camera={{ position: [0, 2, 7], rotation: [0, 0, 0] }}>
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
                asset={require('../assets/models/Cheese.glb')}
                scale={0.2}
              />
            </Suspense>
            <gridHelper args={[4, 2, 'white', 'white']} />
            {dots.map((dot, index) => {
              return (
                <mesh key={index} position={[dot[0], 0, dot[1]]}>
                  <sphereGeometry args={[0.05]} />
                  <meshStandardMaterial />
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
  circle: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  icon: {
    width: 35,
    height: 35,
  },
});