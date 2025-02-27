import {
  Platform,
  StyleSheet,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import { useState, useEffect } from 'react';
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { useGLTF } from '@react-three/drei/native';
import { Canvas } from '@react-three/fiber/native';
import GameCanvas from './GameCanvas';
import EndScreen from './EndScreen';
import Timer from './Timer';
import { playSound } from './playSound';
import { Audio } from 'expo-av';

const backgroundImage = require('../assets/images/3d-rendering-cartoon-welcome-door.jpg');

const icons = {
  salt: require('../assets/icons/salt.png'),
  cheese: require('../assets/icons/cheese.png'),
  onion: require('../assets/icons/onion.png'),
  chicken: require('../assets/icons/chicken.png'),
  bacon: require('../assets/icons/bacon.png'),
  vinegar: require('../assets/icons/vinegar.png'),
  prawn: require('../assets/icons/prawn.png'),
  blank: require('../assets/icons/blank.png'),
};

export const Game = () => {
  //music
  useEffect(() => {
    let sound = new Audio.Sound();

    async function playSound() {
      try {
        await sound.loadAsync(require('../assets/MP3/Galactic Rap.mp3'));

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            sound.replayAsync();
          }
        });

        await sound.playAsync();
      } catch (error) {
        console.log('Failed to play the sound', error);
      }
    }

    playSound();

    return () => {
      if (sound) {
        sound.stopAsync();
        sound.unloadAsync();
      }
    };
  }, []);

  const TOTAL_GAME_TIME = 2 * 60; // measured in seconds
  const [isGameOver, setIsGameOver] = useState(false);
  const [crispX, setCrispX] = useState(0);
  const [crispZ, setCrispZ] = useState(0);
  const [touchDownX, setTouchDownX] = useState(0);
  const [touchDownY, setTouchDownY] = useState(0);
  const [contents, setContents] = useState([null, null, null, null, null]);
  const INGREDIENT_TYPES = [
    {
      name: 'cheese',
      asset: useGLTF(require('../assets/models/Cheese.glb')),
      scale: 0.3,
    },
    {
      name: 'salt',
      asset: useGLTF(require('../assets/models/Salt.glb')),
      scale: 2.0,
    },
    {
      name: 'chicken',
      asset: useGLTF(require('../assets/models/chicken.glb')),
      scale: 0.008,
    },
    {
      name: 'bacon',
      asset: useGLTF(require('../assets/models/bacon.glb')),
      scale: 0.08,
    },
    {
      name: 'vinegar',
      asset: useGLTF(require('../assets/models/vinegar.glb')),
      scale: 0.5,
    },
    {
      name: 'prawn',
      asset: useGLTF(require('../assets/models/prawn.glb')),
      scale: 0.1,
    },
  ];
  const [currentType, setCurrentType] = useState(
    INGREDIENT_TYPES[Math.floor(Math.random() * INGREDIENT_TYPES.length)]
  );
  const [score, setScore] = useState(0);

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

  const emptyContents = () => {
    setContents([null, null, null, null, null]);
  };

  const handCatch = () => {
    playSound(require('../assets/SoundEffects/score.mp3'));
    let newScore = 0;
    for (let i = 0; i < contents.length; i++)
      if (contents[i] === currentType.name) newScore++;
    setScore((score) => score + newScore);
    emptyContents();
  };

  const iconColor = (content) => {
    if (!content) return styles.white;
    if (content === currentType.name) return styles.green;
    if (content !== currentType.name) return styles.red;
  };

  const icon = (content) => {
    if (!content) {
      return icons.blank;
    }
    if (content) return icons[content];
  };

  return (
    <GestureHandlerRootView style={styles.canvas}>
      <ImageBackground source={backgroundImage} style={styles.image}>
        <View style={styles.hintContainter}>
          <View style={styles.hint}>
            <ImageBackground
              source={icons[currentType.name]}
              style={styles.hintIcon}
            />
          </View>
        </View>
        <View style={styles.gameInfoContainer}>
          <Timer
            totalGameTime={TOTAL_GAME_TIME}
            setIsGameOver={setIsGameOver}
            textStyle={styles.timer}
          />
          <Text style={styles.highScore}>Score: {score}</Text>
        </View>
        <View style={styles.circleContainer}>
          {contents.map((content, index) => {
            return (
              <View key={index} style={iconColor(content)}>
                <ImageBackground source={icon(content)} style={styles.icon} />
              </View>
            );
          })}
        </View>
        {isGameOver ? (
          <EndScreen score={score} />
        ) : (
          <GestureDetector gesture={Platform.OS === 'ios' ? pan : longPress}>
            <Canvas camera={{ position: [0, 2, 8], rotation: [0, 0, 0] }}>
              <GameCanvas
                crispX={crispX}
                crispZ={crispZ}
                handCatch={handCatch}
                contents={contents}
                setContents={setContents}
                currentType={currentType}
                INGREDIENT_TYPES={INGREDIENT_TYPES}
              />
            </Canvas>
          </GestureDetector>
        )}
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
  gameInfoContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  highScore: {
    fontSize: 24,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  timer: {
    fontSize: 24,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
    margin: 5,
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
  hintContainter: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  hint: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  hintIcon: {
    width: 55,
    height: 55,
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
