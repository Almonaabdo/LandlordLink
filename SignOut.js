import { LoginButton } from "./components/Buttons";
import { StatusBar } from "react-native";
import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { auth } from './firebaseConfig'; // Firebase configuration
import { signOut } from 'firebase/auth';
import { stylesLogin } from './styles/stylesLogin'; // Assuming you have global styles

export default function SignOutScreen({ navigation }) {
  // Function to handle sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Firebase sign out function
      console.log("User signed out.");

      // Navigate to the Login screen after signing out
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" />
      <Text style={stylesLogin.textHeader}>Are you sure you want to sign out?</Text>

      <LoginButton onPress={handleSignOut} text="Sign Out" />

      {/* Cancel button */}
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text style={stylesLogin.textLabel}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}
