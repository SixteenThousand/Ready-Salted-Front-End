import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import styles from "../styles";
import { Audio } from "expo-av";
import { useEffect } from "react";

export default function TitleScreen({ navigation }) {
  useEffect(() => {
    let sound = new Audio.Sound();

    async function playSound() {
      try {
        await sound.loadAsync(require("../assets/MP3/Paradise_Found.mp3"));

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            sound.replayAsync();
          }
        });

        await sound.playAsync();
      } catch (error) {
        console.log("Failed to play the sound", error);
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
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.titleImage}
        source={require("../assets/images/Designer-3.jpg")}
        resizeMode="cover"
      >
        <TouchableOpacity
          style={styles.ButtonStart}
          onPress={() => navigation.navigate("game")}
        >
          <Text style={styles.ButtonTextStart}>Start Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Button4}
          onPress={() => navigation.navigate("how-to-play")}
        >
          <Text style={styles.ButtonText}>How To Play</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Button4}
          onPress={() => navigation.navigate("profile")}
        >
          <Text style={styles.ButtonText}>User Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Button4}
          onPress={() => navigation.navigate("scores")}
        >
          <Text style={styles.ButtonText}>High Scores</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Button4}
          onPress={() => navigation.navigate("credits")}
        >
          <Text style={styles.ButtonText}>Credits</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
