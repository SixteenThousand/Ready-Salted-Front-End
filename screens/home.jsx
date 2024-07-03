import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import styles from "../styles";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
      style={styles.Logo}
      source={require("../assets/images/Designer-2.jpg")} />
      <ImageBackground
        style={styles.Image}
        source={require("../assets/images/Ingenious idea-3.png")}
        resizeMode="cover">
      <TouchableOpacity style={styles.Button1}>
        <Text style={styles.ButtonText}>Create User</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Button2}>
        <Text style={styles.ButtonText}>      Login      </Text>
      </TouchableOpacity>

      </ImageBackground>
    </View>
  );
}
