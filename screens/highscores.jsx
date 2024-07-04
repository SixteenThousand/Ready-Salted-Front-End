import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
  } from "react-native";
  import React from "react";
  import styles from "../styles";
  
  
  
  export default function ScoreScreen() {
    return (
      <ImageBackground
        style={styles.titleImage}
        source={require("../assets/images/Designer-3.jpg")}

        resizeMode="cover"
      >
      <View style={styles.container}>
           <Text>HIGH SCORES</Text>
      </View>
      </ImageBackground>
    );
  }