/*
* FILE        : Login.js
* 
* Description : Login page allows user to login and redirects them to Home page on success. Includes styling
* 
* Author      : Abdurrahman Almouna, Yafet Tekleab
* Date        : October 31, 2024
* Version     : 1.0
* 
*/

import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StatusBar, ActivityIndicator, Alert, TextInput, KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { auth } from '../firebaseConfig'; // Adjust the path as necessary
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoginButton } from "../components/Buttons";

// Logo
const logoImg = require("../assets/Accommod8u.jpg");

// global variables
const invalidEmailError = -2;
const invalidInformationError = -1;


export function Payments({ navigation }) 
{

  // fields for user info
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewError, setViewError] = useState(0);

  // function to validate user sign in in databse
  const handleSignIn = async () => 
  {
    try 
    {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // redirect user to home page
      navigation.replace("Back", { isUserLoggedIn: true });
      setViewError(0);
    } 
    catch (error) 
    {
      setViewError(invalidInformationError);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <StatusBar barStyle="light-content" />

        {/* NOT A MEMBER */}
        <Text style={styles.signUpText}>PAYMENTS</Text>

      </KeyboardAvoidingView>
    </ScrollView>
  );
}



// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: '4%',
  },
  logo: {
    width: '100%',
    height: 150,
    marginTop: '5%',
    resizeMode: 'stretch',
    borderRadius: 20,
    alignSelf: 'center',
  },
  titleHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  subHeader: {
    color: "gray",
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    height: 50,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  signUpContainer: {
    alignSelf: "center",
    marginTop: 10,
  },
  signUpText: {
    color: '#3e1952',
  },
});