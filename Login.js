// Custom
import {CancelButton, LoginButton} from "./components/Buttons";
import { stylesLogin } from "./styles/stylesLogin";

// Native
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useState} from "react";
import { View, Text, Image, ScrollView, TouchableOpacity,Modal, StatusBar,ActivityIndicator, Alert, TextInput, KeyboardAvoidingView} from "react-native";
import * as React from 'react';


// logos
const logoImg = require("./assets/Accommod8u.jpg");
const smallLogoImg = require("./assets/logo.jpg");




export function LoginScreen({navigation})
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewError, setViewError] = useState(0);

  return (
      <View style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
      <KeyboardAvoidingView behavior="position">
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          showsHorizontalScrollIndicator={false}>
    
          {/* STATUS BAR */}
          <StatusBar barStyle="light-content" />
    
          {/* LOGOS */}
          <Image source={logoImg} style={stylesLogin.profileImage} />
          <Image source={smallLogoImg} style={[stylesLogin.profileImage, stylesLogin.smallLogo]} />

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
          <LoginButton text="Login" onPress={() => isFormValid()}/>

          {/* VALIDATING FORM */}
          {viewError === -1 &&<Text style={stylesLogin.textError}>Invalid Email or Password</Text>}
          {viewError === -2 &&<Text style={stylesLogin.textError}>Invalid Email @</Text>}

          <TouchableOpacity style={{alignSelf:"center"}} onPress={() => navigation.push("Signup")}>
              <Text style={stylesLogin.textLabel}>Not A Member ?</Text>
          </TouchableOpacity>   

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      </View>
  );

  function isFormValid()
  {
    if (!email.includes("@"))
    {
      setViewError(-2);
      return
    }
    if (email === "" || password.length < 8)
    {
      setViewError(-1);
      return
    }
    setViewError(1);
    setTimeout(navigateToHome, 1100); //1.1 s
  }

  function navigateToHome() 
  {
    navigation.navigate("Home");
    setViewError(0);
  }
}