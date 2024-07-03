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

const RegisterForm = ({ navigation }) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.Image}
        source={require("../assets/images/Ingenious idea-3.png")}

        resizeMode="cover"
      >
        <Text style={styles.title}>Enter your Username and Password</Text>
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
              placeholder="Choose a password"
            />
          )}
        />
        <Button
          style={styles.Button2}
          title="Submit"
          
          onPress={() => navigation.navigate("title")}
        />

      </ImageBackground>
    </View>
  );
};

export default RegisterForm;
