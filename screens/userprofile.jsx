import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Audio } from "expo-av";
import styles from "../styles";

const BoopButton = () => {
  const [sound, setSound] = useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../assets/MP3/T. Bless - Froggy Fraud Adventure.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); 
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <TouchableOpacity onPress={playSound} style={styles.button}>
      <Text style={styles.buttonText}>Music!</Text>
    </TouchableOpacity>
  );
};

export default function ScoreScreen() {
  return (
    <ImageBackground
      style={styles.titleImage}
      source={require("../assets/images/Designer-6.jpg")}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.titleText}>HIGH SCORES</Text>
        <BoopButton />
      </View>
    </ImageBackground>
  );
}