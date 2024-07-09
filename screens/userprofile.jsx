import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { Audio } from "expo-av";
import styles from "../styles";
import { deleteUserByUsername } from "../api/api";

const hardcodedUser = {
  username: "Luc",
};

export default function ScoreScreen() {
  return (
    <ImageBackground
      style={styles.titleImage}
      source={require("../assets/images/Designer-6.jpg")}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>User Profile</Text>
        <Text style={styles.title}>Hi there {hardcodedUser.username}</Text>
        <DeleteButton username={hardcodedUser.username} />
      </View>
    </ImageBackground>
  );
}
const DeleteButton = ({ username }) => {
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/SoundEffects/hitHurt.wav")
    );
    setSound(sound);
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to leave us?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const response = await deleteUserByUsername(username);
              console.log(response);
              playSound();
            } catch (error) {
              console.error("Failed to delete account:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <TouchableOpacity onPress={handleDeleteAccount} style={styles.Button4}>
      <Text style={styles.ButtonText}>Press here to delete your account</Text>
    </TouchableOpacity>
  );
};
