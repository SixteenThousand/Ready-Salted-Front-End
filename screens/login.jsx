import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import styles from "../styles";
import { useForm, Controller } from "react-hook-form";
import { color } from "three/examples/jsm/nodes/Nodes.js";

const RegisterForm = ({ navigation }) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
    <View style={styles.container}>
      <ImageBackground
        style={styles.Image}
        source={require("../assets/images/Ingenious idea-3.png")}

        resizeMode="cover"
      >
        
        <Text style={styles.title}>Login!</Text>
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
              placeholder="Password"
            />
          )}
        />
        <Text style={{color:'purple', fontWeight: '700'}}>Forgot password</Text>
        <TouchableOpacity
          style={styles.Button2}
          title="Log in"
          onPress={() => navigation.navigate("title")}
        ><Text style={styles.ButtonText}>Log in</Text>
        </TouchableOpacity>

      </ImageBackground>
    </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterForm;
