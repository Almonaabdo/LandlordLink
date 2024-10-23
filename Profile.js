import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, TextInput, ScrollView } from "react-native";
import { LoginButton } from "./components/Buttons.js";
import { auth } from './firebaseConfig';  // Import Firebase auth for logout

const profileImage = require("./assets/profile.jpg");

export function Profile({ navigation }) {
  // State hooks
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState(auth.currentUser?.email || "user@example.com");
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementDetails, setAnnouncementDetails] = useState("");

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.textHeader}>Account Settings</Text>
      <Image source={profileImage} style={styles.profileImage} />
      <Text style={styles.name}>Yafet Tekleab</Text>

      <View style={{margin:'10%'}}/>

      {/* Email Input */}
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput 
          style={styles.input} 
          value={email} 
          editable={false}/>

      <View style={{margin:'3%'}}/>

      {/* Password Input */}
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput 
          style={styles.input} 
          value="*********" 
          editable={false} />


      <View style={{margin:'20%'}}/>
      {/* Logout BUTTON */}
      <LoginButton text="Logout" onPress={() => navigation.navigate("SignOut")} />
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  textHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '3%',
    alignSelf: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#1560BD',
    alignSelf: 'center',
    marginBottom: 20,

  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  spacer: {
    height: 60,
  },
});