import React, { useState, useContext } from "react"; 
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  StyleSheet,
} from "react-native";
import { Audio } from "expo-av";
import { deleteUserByUsername } from "../api/api";
import { UserContext } from "../context/userProvider"; 
import { useNavigation } from '@react-navigation/native'; 

export default function ScoreScreen() {
  const { user } = useContext(UserContext); 

  return (
    <ImageBackground
      style={styles.titleImage}
      source={require("../assets/images/Designer-6.jpg")}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>User Profile</Text>
        <Text style={styles.username}>Hi there {user.username}</Text>
        <DeleteButton username={user.username} />
      </View>
    </ImageBackground>
  );
}

const DeleteButton = ({ username }) => {
  const [sound, setSound] = useState();
  const navigation = useNavigation(); // Get navigation prop

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
              navigation.navigate("Home"); // Navigate to Home screen
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
    <TouchableOpacity onPress={handleDeleteAccount} style={styles.button}>
      <Text style={styles.buttonText}>Delete Your Account</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  titleImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  username: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FF4136",
    padding: 15,
    borderRadius: 10,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

