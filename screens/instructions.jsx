import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
  } from "react-native";
  import React from "react";
  import styles from "../styles";

 
  
  export default function InstructionsScreen({ navigation }) {
    return (
      <View style={styles.instructionsContainer}>
      <Text style={styles.instructionsTitle}>How To Play</Text>
      <Text style={styles.instructionsParagraph}>
        The aim of the game is to catch the correct ingredients depending on the flavor of crisps.
      </Text>
      <Text style={styles.instructionsList}>
        Ready Salted: Catches Salt{'\n'}
        Cheese And Onion: Catches Cheese{'\n'}
        Smokey Bacon: Catches Bacon{'\n'}
        Roast Chicken: Catches Chicken
      </Text>
      <Text style={styles.instructionsParagraph}>
        Once you have a full bag of crisps, you must move to the Hungry Hand position to score your points.
      </Text>
      <Text style={styles.instructionsParagraph}>
        If you catch the wrong ingredients, this will affect how many points you can score.
      </Text>
      <Text style={styles.instructionsParagraph}>
        The speed of ingredients falling will increase as the in-game timer counts down, increasing difficulty gradually.
      </Text>
      <Text style={styles.instructionsParagraph}>
        Good luck, the Hungry Humans are depending on you!!!
      </Text>
    </View>
    );
  }

  