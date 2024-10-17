// Custom
import {LoginButton} from "./components/Buttons";
import { stylesLogin } from "./styles/stylesLogin";

// Native
import { useState} from "react";
import { View, Text, Image,  TouchableOpacity,Modal, StatusBar,ActivityIndicator, Alert, TextInput, KeyboardAvoidingView} from "react-native";
import * as React from 'react';
import { ScrollView } from "react-native-gesture-handler";

// Import for sign in with firebase
import { auth } from './firebaseConfig'; // Make sure the path is correct
import { signInWithEmailAndPassword } from "firebase/auth";



// logos
const logoImg = require("./assets/Accommod8u.jpg");

export function LoginScreen({navigation})
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewError, setViewError] = useState(0);

  const handleSignIn = async () => {
    console.log("Here in sign in."); // Debug
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password); // Give email and password and authenticate user
      const user = userCredential.user;
  
      // Print user information (for debug)
      console.log("User Info:", {
        UID: user.uid,
        Email: user.email,
        DisplayName: user.displayName, // If you have a display name set
        EmailVerified: user.emailVerified,
        CreationTime: user.metadata.creationTime,
        LastSignInTime: user.metadata.lastSignInTime,
      });
  
      navigateToHome(); // If succesfully authenticated
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      setViewError(-1); // Show error message
    }
  };
  
  return (
      <ScrollView style={{ flex: 1, backgroundColor: "white", padding: '4%'}}>
      <KeyboardAvoidingView behavior="position">
    
          {/* STATUS BAR */}
          <StatusBar barStyle="dark-content" />
          <View style={{marginTop:'11%'}}></View>
          {/* LOGOS */}
          <Image source={logoImg} style={stylesLogin.companyImage} />

          {/* LOADING EMOJI */}
          <ActivityIndicator
            size={"large"}
            color={"purple"}
            animating = {viewError === 1 && true}
          />

          {/* WELCOME*/ }
          <Text style={stylesLogin.textHeader}>Welcome Back!</Text>
          <Text style={{color:"gray", marginBottom:20, marginVertical:2}}>Log Into your Account</Text>
    
          {/* Email INPUT*/ }
          <View style={stylesLogin.container}>
            <Text style={stylesLogin.inputLabel}>Email</Text>
            <TextInput
              style={stylesLogin.textInput}
              placeholder="Enter Email..."
              onChangeText={(text)=>{setEmail(text), setViewError(0)} } // The second condition is to hide error message when user enters a value
              value={email}/>
    
          {/* Password INPUT*/ }
          <Text style={stylesLogin.inputLabel}>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={stylesLogin.textInput}
              onChangeText={(text)=>{setPassword(text), setViewError(0)}}
              value={password}
              placeholder="Enter Password..."/>
    
          {/* LOGIN BUTTON*/}
          <LoginButton text="Login" onPress={() => {
            if (isFormValid()) {
              handleSignIn(); // Call the handleSignIn function after form validation
            }
          }} />

          {/* VALIDATING FORM */}
          {viewError === -1 &&<Text style={stylesLogin.textError}>Invalid Email or Password</Text>}
          {viewError === -2 &&<Text style={stylesLogin.textError}>Invalid Email @</Text>}


          {/* NOT A MEMBER BUTTON */}
          <TouchableOpacity style={{alignSelf:"center"}} onPress={() => navigation.navigate("Signup")}>
              <Text style={stylesLogin.textLabel}>Not A Member ?</Text>
          </TouchableOpacity>   
          </View>
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

  function navigateToHome() 
  {
    navigation.navigate("Home", {isUserLoggedIn : true, });
    setViewError(0);
  }
}