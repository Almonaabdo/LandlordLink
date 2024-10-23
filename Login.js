import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StatusBar, ActivityIndicator, Alert, TextInput, KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { auth } from './firebaseConfig'; // Adjust the path as necessary
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoginButton } from "./components/Buttons";

// Logo
const logoImg = require("./assets/Accommod8u.jpg");

export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewError, setViewError] = useState(0);

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      navigation.navigate("Home", { isUserLoggedIn: true });
      setViewError(0);
    
    } catch (error) {
      console.log(error.code, error.message);
      setViewError(-1);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <StatusBar barStyle="dark-content" />


        <View style={styles.logoContainer}>
          <Image source={logoImg} style={styles.logo} />
        </View>

        <ActivityIndicator size={"large"} color={"purple"} animating={viewError === 1} />

        <Text style={styles.titleHeader}>Welcome Back!</Text>
        <Text style={styles.subHeader}>Log Into your Account</Text>


        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Email..."
          onChangeText={(text) => { setEmail(text); setViewError(0); }}
          value={email}/>

        <Text style={styles.label}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.textInput}
          placeholder="Enter Password..."
          onChangeText={(text) => { setPassword(text); setViewError(0); }}
          value={password}/>

        <LoginButton text="Login" onPress={() => {if (isFormValid()) {handleSignIn();}}} />

        {viewError === -1 && <Text style={styles.errorText}>Invalid Email or Password</Text>}
        {viewError === -2 && <Text style={styles.errorText}>Invalid Email @</Text>}

        <TouchableOpacity style={styles.signUpContainer} onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signUpText}>Not A Member?</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );

  function isFormValid() {
    if (!email.includes("@")) {
      setViewError(-2);
      return false;
    }
    if (email === "" || password.length < 8) {
      setViewError(-1);
      return false;
    }
    setViewError(1);
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
    marginTop: '20%',
    resizeMode: 'stretch',
    borderRadius:20,
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