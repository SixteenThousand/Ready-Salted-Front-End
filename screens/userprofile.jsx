import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Audio } from "expo-av";
import styles from "../styles";
import { userData } from "three/examples/jsm/nodes/Nodes.js";



export default function ScoreScreen() {
  return (
    <ImageBackground
      style={styles.titleImage}
      source={require("../assets/images/Designer-6.jpg")}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.titleText}>User Profile</Text>
        <Text style={styles.titleText}>`You are logged in as ${userData}`</Text>
        <BoopButton />
      </View>
    </ImageBackground>
  );

}const BoopButton = () => {
  const [sound, setSound] = useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../assets/SoundEffects/Wrong.wav')
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
    <TouchableOpacity onPress={playSound} style={styles.Button4}>
      <Text style={styles.ButtonText}>Press here to delete your account</Text>
    </TouchableOpacity>
  );
};