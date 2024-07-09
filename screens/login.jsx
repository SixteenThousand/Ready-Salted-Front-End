import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useContext } from "react";
import { UserContext } from "../context/userProvider";
import styles from "../styles";
import { useForm, Controller } from "react-hook-form";
import { color } from "three/examples/jsm/nodes/Nodes.js";
import { login } from '../utils/login'

const RegisterForm = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const [ loggedIn, setLoggedIn ] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const onSubmit = ({ username, password }) => {
    login(username, password).then((result) => {
      if(result){
        setUser(result)
        setLoggedIn(true);
        navigation.navigate("title")
      }
    })
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
          name="username"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="User Name"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Text style={{color:'purple', fontWeight: '700'}}>Forgot password</Text>
        <TouchableOpacity
          style={styles.Button2}
          title="Log in"
          onPress={handleSubmit(onSubmit)}
          //onPress={() => navigation.navigate("title")}
        ><Text style={styles.ButtonText}>Log in</Text>
        </TouchableOpacity>

      </ImageBackground>
    </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterForm;
