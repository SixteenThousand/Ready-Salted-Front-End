import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
  } from "react-native";
  import React from "react";
  import styles from "../styles";
  
  
  
  export default function TitleScreen({ navigation }) {
    return (
      <View style={styles.container}>
              <Text>Ready Salted</Text>  
              
        <Text style={styles.ButtonText}>Create New User</Text>
      
      </View>
    );
  }
  