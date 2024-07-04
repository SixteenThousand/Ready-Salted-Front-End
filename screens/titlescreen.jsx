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
         <ImageBackground
        style={styles.titleImage}
        source={require("../assets/images/Designer-3.jpg")}

        resizeMode="cover"
      >
              
              <TouchableOpacity style={styles.Button2} onPress={() => navigation.navigate('game')}>
                  <Text style={styles.ButtonText}>Start Game</Text>
              </TouchableOpacity> 

             <TouchableOpacity style={styles.Button2} onPress={() => navigation.navigate('how-to-play')}>
                  <Text style={styles.ButtonText}>How To Play</Text>
            </TouchableOpacity>   

              <TouchableOpacity style={styles.Button2} onPress={() => navigation.navigate("profile")}>
                  <Text style={styles.ButtonText}>User Profile</Text>
              </TouchableOpacity> 

              <TouchableOpacity style={styles.Button2} onPress={() => navigation.navigate("scores")}>
                  <Text style={styles.ButtonText}>High Scores</Text>
              </TouchableOpacity>  

              </ImageBackground>


      
      </View>
    );
  }
  