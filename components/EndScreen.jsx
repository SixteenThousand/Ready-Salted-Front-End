import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import globalStyleSheet from '../styles'; 


function scoreMessage(score) {
  const SCORE_MESSAGES = [
    "oof.",
    "Nice Try!",
    "Good Seasoning",
    "Tasty!",
    "Ready Salted!"
  ];
  if(score < 5) return SCORE_MESSAGES[0];
  if(score < 10) return SCORE_MESSAGES[1];
  if(score < 15) return SCORE_MESSAGES[2];
  if(score < 20) return SCORE_MESSAGES[3];
  return SCORE_MESSAGES[4];
}

export default function EndScreen({ setIsGameOver, score }) {
  const restartGame = () => {
    setIsGameOver(false);
  };
  const exitGame = () => {
    // don't know what to do here yet
  };

  return <View style={styles.allContainer}>
    <Text style={styles.endMessage}>{scoreMessage(score)}</Text>
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
