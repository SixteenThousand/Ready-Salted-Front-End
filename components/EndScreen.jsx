import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import globalStyleSheet from '../styles'; 
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { UserContext } from '../context/userProvider';
import { updateUserbyUsername, getUserByUsername } from '../api/api';


function scoreMessage(score) {
  const { user, setUser } = useContext(UserContext);
  const SCORE_MESSAGES = [
    "oof.",
    "Nice Try!",
    "Good Seasoning",
    "Tasty!",
    "Ready Salted!"
  ];
  if(score >= user.score) {
    updateUserbyUsername(user.username,{
      score: score,
    }).then(() => {
      getUserByUsername(user.username).then((result) => {
        setUser(result);
      });
    });
    return "New Personal Best!";
  }
  if(score < 5) return SCORE_MESSAGES[0];
  if(score < 10) return SCORE_MESSAGES[1];
  if(score < 15) return SCORE_MESSAGES[2];
  if(score < 20) return SCORE_MESSAGES[3];
  return SCORE_MESSAGES[4];
}

export default function EndScreen({ score, }) {
  const navigation = useNavigation();
  const exitGame = () => {
    navigation.navigate('title');
  };
  
  return <View style={styles.allContainer}>
    <Text style={styles.endMessage}>{scoreMessage(score)}</Text>
    <Text style={styles.scoreMessage}>Your score was:</Text>
    <Text style={styles.scoreNumber}>{score}</Text>
    <TouchableOpacity
      style={globalStyleSheet.Button2}
      onPress={exitGame}
    >
      <Text style={styles.buttonText}>Back To Menu</Text>
    </TouchableOpacity>
  </View>;
}


const styles = StyleSheet.create({
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
