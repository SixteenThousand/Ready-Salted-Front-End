import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import globalStyleSheet from '../styles'; 

export default function EndScreen({ setIsGameOver, score }) {
  const restartGame = () => {
    setIsGameOver(false);
  };
  const exitGame = () => {
    // don't know what to do here yet
  };

  return <View style={styles.allContainer}>
    <Text style={styles.endMessage}> Game Over! </Text>
    <Text style={styles.scoreMessage}>Your score was:</Text>
    <Text style={styles.scoreNumber}>{score}</Text>
    <View style={styles.buttonsContainer}>
      <TouchableOpacity style={globalStyleSheet.Button2} onPress={restartGame}>
        <Text style={styles.buttonText}>New Game</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyleSheet.Button2} onPress={exitGame}>
        <Text style={styles.buttonText}>Exit</Text>
      </TouchableOpacity>
    </View>
  </View>;
}


const styles = StyleSheet.create({
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  allContainer: {
    backgroundColor: 0x00aaaabb,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
  },
  endMessage: {
    fontSize: 36,
  },
  scoreMessage: {
    fontSize: 24,
  },
  scoreNumber: {
    fontSize: 96,
    fontWeight: 'bold',
  },
});
