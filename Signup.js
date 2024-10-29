import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StatusBar, ActivityIndicator, TextInput, KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { LoginButton } from "./components/Buttons";

// Logo
const logoImg = require("./assets/Accommod8u.jpg");

export default function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [viewError, setViewError] = useState(0);

  const handleSignUp = async () => {
    if (!isFormValid()) {
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate("Home");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setViewError(-3);
      } else {
        setViewError(-1);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <StatusBar barStyle="light-content" />

        <Image source={logoImg} style={styles.logo} />

        <ActivityIndicator size={"large"} color={"purple"} animating={viewError === 1} />

        <Text style={styles.titleHeader}>Create Your Account</Text>
        <Text style={styles.subHeader}>Sign Up to Get Started</Text>

        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter First Name..."
          onChangeText={(text) => { setFirstName(text); setViewError(0); }}
          value={firstName} />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Last Name..."
          onChangeText={(text) => { setLastName(text); setViewError(0); }}
          value={lastName} />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Email..."
          onChangeText={(text) => { setEmail(text); setViewError(0); }}
          value={email} />

        <Text style={styles.label}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.textInput}
          placeholder="Enter Password..."
          onChangeText={(text) => { setPassword(text); setViewError(0); }}
          value={password} />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.textInput}
          placeholder="Confirm Password..."
          onChangeText={(text) => { setConfirmPassword(text); setViewError(0); }}
          value={confirmPassword} />

        <LoginButton text="Sign Up" onPress={() => { if (isFormValid()) { handleSignUp(); } }} />

        {viewError === -1 && <Text style={styles.errorText}>Invalid User Information</Text>}
        {viewError === -2 && <Text style={styles.errorText}>Passwords Don't Match</Text>}
        {viewError === -3 && <Text style={styles.errorText}>Email is Already in use</Text>}

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signInText}>Already A Member?</Text>
        </TouchableOpacity>


      </KeyboardAvoidingView>
    </ScrollView>
  );

  function isFormValid() {
    if (firstName === "" || lastName === "" || email === "" || password.length < 8) {
      setViewError(-1);
      return false;
    }
    if (password !== confirmPassword) {
      setViewError(-2);
      return false;
    }
    setViewError(0);
    return true;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: '4%',
  },
  logo: {
    width: '100%',
    height: 150,
    resizeMode: 'stretch',
    borderRadius: 20,
    marginTop: '10%',
    alignSelf: 'center',
  },

  titleHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeader: {
    color: "gray",
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
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  signInText: {
    color: '#3e1952',
    alignSelf: 'center',
    marginTop: '2%'
  },
});