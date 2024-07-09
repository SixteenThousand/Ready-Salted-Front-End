import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";

const InstructionsScreen = ({ navigation }) => {
  return (
    <ImageBackground
      style={localStyles.imageBackground}
      source={require("../assets/images/Ingenious idea-3.png")}
      resizeMode="cover"
    >
      <View style={localStyles.overlay}>
        <Text style={localStyles.instructionsTitle}>How To Play</Text>
        <Text style={localStyles.instructionsParagraph}>
          The aim of the game is to catch the correct ingredients depending on the flavor of crisps.
        </Text>
        <Text style={localStyles.instructionsList}>
          Ready Salted: Catches Salt{'\n'}
          Cheese And Onion: Catches Cheese{'\n'}
          Smokey Bacon: Catches Bacon{'\n'}
          Roast Chicken: Catches Chicken
        </Text>
        <Text style={localStyles.instructionsParagraph}>
          Once you have a full bag of crisps, you must move to the Hungry Hand position to score your points.
        </Text>
        <Text style={localStyles.instructionsParagraph}>
          If you catch the wrong ingredients, this will affect how many points you can score.
        </Text>
        <Text style={localStyles.instructionsParagraph}>
          The speed of ingredients falling will increase as the in-game timer counts down, increasing difficulty gradually.
        </Text>
        <Text style={localStyles.instructionsParagraph}>
          Good luck, the Hungry Humans are depending on you!!!
        </Text>
      </View>
    </ImageBackground>
  );
};

const localStyles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  instructionsTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD700', 
    textAlign: 'center',
    marginBottom: 20,
  },
  instructionsParagraph: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 26,
  },
  instructionsList: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'left',
    marginBottom: 15,
    lineHeight: 26,
  },
});

export default InstructionsScreen;





