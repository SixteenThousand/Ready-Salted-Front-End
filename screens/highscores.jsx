import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";
import styles from "../styles"; 

const ScoreScreen = () => {
  const bestScore = 12345; // Example best score

  return (
    <ImageBackground
      style={styles.titleImage}
      source={require("../assets/images/Designer-4.jpg")}
      resizeMode="cover"
    >
      <View style={[styles.container, localStyles.overlay]}>
        <Text style={localStyles.title}>HIGH SCORES</Text>
        <View style={localStyles.scoreFrame}>
          <Text style={localStyles.scoreText}>Personal Best</Text>
          <Text style={localStyles.score}>{bestScore}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const localStyles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD700', 
    marginBottom: 20,
  },
  scoreFrame: {
    borderWidth: 5,
    borderColor: '#FFD700', 
    borderRadius: 10,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ScoreScreen;
