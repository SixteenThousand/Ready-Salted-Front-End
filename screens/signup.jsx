import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import styles from "../styles";
import { useForm, Controller } from "react-hook-form";


const SimpleForm = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.Image}
        source={require("../assets/images/Ingenious idea-3.png")}
        resizeMode="cover">
      <Text style={styles.title}>Create a Username and Password</Text>
      <Controller
        control={control}
        name="fieldName"
        render={({ field }) => (
          <TextInput
            {...field}
            style={styles.input}
            placeholder="User Name"
          />
        )}
      />
      <Controller
        control={control}
        name="fieldName"
        render={({ field }) => (
          <TextInput
            {...field}
            style={styles.input}
            placeholder="Enter your email"
          />
        )}
      />
      <Controller
        control={control}
        name="fieldName"
        render={({ field }) => (
          <TextInput
            {...field}
            style={styles.input}
            placeholder="Choose a password"
          />
        )}
      />
      <TouchableOpacity
          style={styles.Button2}
          title="Log in"
          onPress={() => navigation.navigate("title")}
        ><Text style={styles.ButtonText}>Sign up!</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};



export default SimpleForm;