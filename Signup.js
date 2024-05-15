// Custom
import {CancelButton, LoginButton} from "./components/Buttons";
import { stylesLogin } from "./styles/stylesLogin";

// Native
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useState} from "react";
import { View, Text, Image, ScrollView, Button,Modal, StatusBar,ActivityIndicator, Alert, TextInput, TouchableOpacity, KeyboardAvoidingView} from "react-native";
import * as React from 'react';

// logos
const logoImg = require("./assets/Accommod8u.jpg");
const smallLogo = require("./assets/logo.jpg");


export function SignUpScreen({ navigation })
 {
    return (
        <View style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
        <KeyboardAvoidingView behavior="position">

          <ScrollView 
            showsVerticalScrollIndicator={false} 
            showsHorizontalScrollIndicator={false}>
    
    
            {/* STATUS BAR */}
            <StatusBar barStyle="light-content" />
    
            {/* LOADING EMOJI */}
            <ActivityIndicator
              size={"large"}
              color={"red"}
              animating = "false"
              />
    
            {/* LOGOS */}
            <Image source={logoImg} style={stylesLogin.profileImage} />
            <Image source={smallLogo} style={[stylesLogin.profileImage, stylesLogin.smallLogo]} />
    
    
    
            {/* INPUTS*/ }
            <Text style={stylesLogin.textHeader}>Welcome Back!</Text>
            <Text style={{color:"gray", marginBottom:20, marginVertical:2}}>Log Into your Account</Text>
    
            {/* Email*/ }
            <View style={stylesLogin.container}>
              <Text style={stylesLogin.inputLabel}>Email</Text>
              <TextInput
                style={stylesLogin.textInput}
                placeholder="Enter Email..."/>
    
            {/* Password*/ }
            <Text style={stylesLogin.inputLabel}>Password</Text>
              <TextInput
                style={stylesLogin.textInput}
                secureTextEntry={true}
                placeholder="Enter Password..."/>

            <Text style={stylesLogin.inputLabel}>Confirm Password</Text>
              <TextInput
                style={stylesLogin.textInput}
                secureTextEntry={true}
                placeholder="Confirm Password..."/>
    
            {/* Login Button */}
            <LoginButton text="Sign Up"/>

            <TouchableOpacity style={{alignSelf:"center"}} onPress={() => navigation.push("Login")}>
                <Text style={stylesLogin.textLabel}>Already A Member ?</Text>
            </TouchableOpacity>
    
            </View>
    
    
          </ScrollView>
          </KeyboardAvoidingView>
        </View>
    );
  }