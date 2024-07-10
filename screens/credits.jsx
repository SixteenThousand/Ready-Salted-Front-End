import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";

const CreditsScreen = ({ navigation }) => {
  return (
    <ImageBackground
      style={localStyles.imageBackground}
      source={require("../assets/images/Ingenious idea-3.png")}
      resizeMode="cover"
    >
      <View style={localStyles.overlay}>
        <Text style={localStyles.title}>Credits</Text>

        <View style={localStyles.creditsList}>
          <Text style={localStyles.creditItem}>Created By: TEAM READY SALTED</Text>
          <Text style={localStyles.creditItem}>Samson Ng</Text>
          <Text style={localStyles.creditItem}>Thomas Lindop</Text>
          <Text style={localStyles.creditItem}>Andrew England</Text>
          <Text style={localStyles.creditItem}>Daniel Mellors</Text>
          <Text style={localStyles.creditItem}>Luc Marteau</Text>
        </View>

        <View style={localStyles.attributionList}>
          <Text style={localStyles.attributionItem}>
            - Crisp Packet Model: *TIME HOTEL 2.10 by S. Paul Michael [CC-BY] via Poly Pizza*
          </Text>
          <Text style={localStyles.attributionItem}>
            - Cheese.glb: *Cheese by bobbeh [CC-BY] via Poly Pizza*
          </Text>
          <Text style={localStyles.attributionItem}>
            - Salt_Shaker.glb: *Salt Shaker by Jarlan Perez [CC-BY] via Poly Pizza*
          </Text>
          <Text style={localStyles.attributionItem}>
            - Hands by Michael Fuchs [CC-BY] via Poly Pizza
          </Text>
          <Text style={localStyles.attributionItem}>
            - Soundtrack: "Paradise Found" Kevin MacLeod (incompetech.com)
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const localStyles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)", 
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFD700", 
    textAlign: "center",
    marginBottom: 20,
  },
  creditsList: {
    alignItems: "center",
    marginBottom: 30,
  },
  creditItem: {
    fontSize: 24,
    color: "#FFF",
    marginBottom: 10,
  },
  attributionList: {
    maxWidth: "80%",
  },
  attributionItem: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 10,
  },
});

export default CreditsScreen;





