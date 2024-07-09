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
import { postNewUser, getUserByUsername, getUserByEmail } from "../api/api";


const SimpleForm = () => {
  const { control, handleSubmit } = useForm();

  

  const checkUserExists = (email, username) => {

    let userExists;
    let emailExists;

    return getUserByUsername(username)
    .then((user) => {
      userExists = user ? true : false;
    })
    .then(() => {
      return getUserByEmail(email);
    })
    .then((user) => {
      emailExists = user ? true : false;
    })
    .then(() => {
      return {userExists, emailExists}
    })


    // return getUsers()
    //   .then((users) => {
    //     const emailExists = users.some((user) => user.email === email);
    //     const usernameExists = users.some((user) => user.username === username);
    //     return { emailExists, usernameExists };
    //   });
  };
  
  const onSubmit = ({ username, email, password }) => {
    return checkUserExists(email, username)
      .then(({ emailExists, usernameExists }) => {
        if (emailExists) {
          alert('Email already in use. Please use a different email.');
          return Promise.reject('Email already in use');
        } else if (usernameExists) {
          alert('Username already in use. Please use a different username.');
          return Promise.reject('Username already in use');
        } else {
          return postNewUser(username, email, password);
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        if (error !== 'Email already in use' && error !== 'Username already in use') {
          console.error('Error submitting form:', error);
        }
      });
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
        <Text style={styles.title}>Let's get some details</Text>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="User Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Choose a password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
        />
        <TouchableOpacity
          style={styles.Button2}
          title="Submit"
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.ButtonText}>Sign up!</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
          </KeyboardAvoidingView>
  );
};

export default SimpleForm;