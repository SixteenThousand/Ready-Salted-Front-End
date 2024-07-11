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
          Ready Salted: Catch Salt{'\n'}
          Cheese And Onion: Catch Cheese{'\n'}
          Smokey Bacon: Catch Bacon{'\n'}
          Roast Chicken: Catch Chicken{'\n'}
          Prawn Coctail: Catch Prawns {'\n'}
          Salt And Vinegar: Catch Vinegar
        </Text>
        <Text style={localStyles.instructionsParagraph}>
          To score points, you must move to the Hungry Hand position and empty your bag.
        </Text>
        <Text style={localStyles.instructionsParagraph}>Once your bag is full you can't catch anymore ingredients, so make sure you empty regularly.</Text>
        <Text style={localStyles.instructionsParagraph}>
          If you catch the wrong ingredients, this will affect how many points you can score.
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





