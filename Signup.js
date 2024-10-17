// Custom
import { LoginButton } from "./components/Buttons";
import { stylesLogin } from "./styles/stylesLogin";

// Native
import { useState } from "react";
import { View, Text, Image, ScrollView, StatusBar, ActivityIndicator, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import React from 'react';

// logos
const logoImg = require("./assets/Accommod8u.jpg");
const smallLogo = require("./assets/logo.jpg");

// Import auth for creating user
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export function SignUpScreen({ navigation }) {
  // fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [viewError, setViewError] = useState(0);

  const handleSignUp = async () => {

    console.log("Sign Up button pressed");

    
    // Validate form first
    if(!isFormValid()) {
        return;
      }

    try {
      await createUserWithEmailAndPassword(auth, email, password); // Call function to create user
      console.log("User signed up successfully.");
      navigation.navigate("Home"); // Nav to home page when successfulled created
    } catch (error)
    {
      if(error.code == "auth/email-already-in-use"){
        setViewError(-3);
      }
      else
      {
        console.error("Error during sign up.", error);
        setViewError(-1);
      }
    }

  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
      <KeyboardAvoidingView behavior="position">

        {/* STATUS BAR */}
        <StatusBar barStyle="light-content" />

        {/* LOADING EMOJI */}
        <ActivityIndicator
          size={"large"}
          color={"red"}
          animating="false"
        />

        {/* LOGOS */}
        <Image source={logoImg} style={stylesLogin.profileImage} />
        {/* <Image source={smallLogo} style={[stylesLogin.profileImage, stylesLogin.smallLogo]} /> */}



        {/* INPUTS*/}
        <Text style={[stylesLogin.textHeader, { marginTop: 20 }]}>Welcome Back!</Text>
        <Text style={{ color: "gray", marginBottom: 10, marginVertical: 1 }}>Register A New Account</Text>

        {/* Email*/}
        <View style={stylesLogin.container}>


          <Text style={stylesLogin.inputLabel}>First Name</Text>
          <TextInput
            style={stylesLogin.textInput}
            onChangeText={(text) => { setFirstName(text) }}
            value={firstName}
            placeholder="Enter First Name..." />

          <Text style={stylesLogin.inputLabel}>Last Name</Text>
          <TextInput
            style={stylesLogin.textInput}
            onChangeText={(text) => { setLastname(text) }}
            value={lastName}
            placeholder="Enter Last Name..." />

          {/* Email*/}
          <Text style={stylesLogin.inputLabel}>Email</Text>
          <TextInput
            style={stylesLogin.textInput}
            onChangeText={(text) => { setEmail(text) }}
            value={email}
            placeholder="Enter Email..." />

          {/* Password*/}
          <Text style={stylesLogin.inputLabel}>Password</Text>
          <TextInput
            style={stylesLogin.textInput}
            secureTextEntry={true}
            onChangeText={(text) => { setPassword(text) }}
            value={password}
            placeholder="Enter Password..." />

          <Text style={stylesLogin.inputLabel}>Confirm Password</Text>
          <TextInput
            style={stylesLogin.textInput}
            secureTextEntry={true}
            onChangeText={(text) => { setConfirmPassword(text) }}
            value={confirmPassword}
            placeholder="Confirm Password..." />

          {/* Signup Button */}
          <LoginButton onPress={handleSignUp} text="Sign Up" />

          {viewError === -1 && <Text style={stylesLogin.textError}>Invalid User Information</Text>}
          {viewError === -2 && <Text style={stylesLogin.textError}>Passwords Don't Match</Text>}
          {viewError === -3 && <Text style={stylesLogin.textError}>Email is Already in use</Text>}

          <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => navigation.navigate("Login")}>
            <Text style={stylesLogin.textLabel}>Already A Member ?</Text>
          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>
    </View>
  );

  function isFormValid() {

    console.log("Validating form...");

    if (email === "" || firstName === "" || lastName === "" || password.length < 8) {
      setViewError(-1);
      console.log("Validation failed: Empty fields or password too short.");

      return;
    }
    if (containsNumber(firstName) || containsNumber(lastName)) {
      setViewError(-1);
      console.log("Validation failed: First or last name contains numbers.");

      return;
    }

    if (password != confirmPassword) {
      setViewError(-2);
      console.log("Validation failed: Passwords do not match.");
      return
    }

    setViewError(0);
    console.log("Form is valid.");
    return true;
  }


  function containsNumber(str) {
    // Check if the string contains any digit between 0 and 9
    return /\d/.test(str);
  }
}