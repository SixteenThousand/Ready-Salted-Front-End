import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { Audio } from "expo-av";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import styles from "../styles";

const TitleScreen = () => {
  const sound = useRef(new Audio.Sound()).current;
  const [isPlaying, setIsPlaying] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const setupAudio = async () => {
    try {
      await sound.loadAsync(require("../assets/MP3/Paradise_Found.mp3"));
      await sound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.log("Failed to play the sound", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      if (isPlaying) {
        sound.stopAsync();
        sound.unloadAsync();
        setIsPlaying(false);
      }
    });

    return unsubscribe;
  }, [navigation, isPlaying]);

  useEffect(() => {
    if (isFocused && !isPlaying) {
      setupAudio();
    }
  }, [isFocused]);

  const handleGameNavigation = async () => {
    if (isPlaying) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setIsPlaying(false);
    }
    navigation.navigate("game");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.titleImage}
        source={require("../assets/images/Designer-3.jpg")}
        resizeMode="cover"
      >
        <TouchableOpacity
          style={styles.ButtonStart}
          onPress={handleGameNavigation}
        >
          <Text style={styles.ButtonTextStart}>Start Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Button4}
          onPress={() => navigation.navigate("how-to-play")}
        >
          <Text style={styles.ButtonText}>How To Play</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Button4}
          onPress={() => navigation.navigate("profile")}
        >
          <Text style={styles.ButtonText}>User Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Button4}
          onPress={() => navigation.navigate("scores")}
        >
          <Text style={styles.ButtonText}>High Scores</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Button4}
          onPress={() => navigation.navigate("credits")}
        >
          <Text style={styles.ButtonText}>Credits</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default TitleScreen;


