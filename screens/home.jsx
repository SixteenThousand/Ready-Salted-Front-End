import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import styles from "../styles";
import SignupScreen from "./signup";


export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.Image}
        source={require("../assets/images/Designer-5.jpg")}
        resizeMode="cover">
      <Image
      style={styles.Logo}
      source={require("../assets/images/readysaltedcut.png")} />
      <TouchableOpacity style={styles.Button1} onPress={() => navigation.navigate('signup')}>
        <Text style={styles.ButtonText}>Create New User</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Button2} onPress={() => navigation.navigate('login')}>
        <Text style={styles.ButtonText}>Play game</Text>
      </TouchableOpacity>

      </ImageBackground>
    </View>
  );
}
