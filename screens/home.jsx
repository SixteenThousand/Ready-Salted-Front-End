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
    <View>
      <Text style={styles.Text}>Ready Salted</Text>
      <ImageBackground
        style={styles.Image}
        source={require("../assets/images/Ingenious idea-3.png")}
        resizeMode="cover">
      <TouchableOpacity style={styles.Button1}>
        <Text>Press Here</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Button2}>
        <Text>Press Here</Text>
      </TouchableOpacity>

      </ImageBackground>
    </View>
  );
}
