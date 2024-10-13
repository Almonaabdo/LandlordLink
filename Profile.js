import {React,useState} from "react";
import {View, Text,Image, ScrollView, TouchableOpacity, Modal, TextInput,StatusBar} from "react-native";
import { StylesHome } from "./styles/stylesHome.js";
import { stylesLogin } from "./styles/stylesLogin.js";
import { LoginButton } from "./components/Buttons.js";
import { KeyboardAvoidingView } from "react-native-web";
import { StyleSheet } from "react-native";
const penIcon = require("./assets/penIcon.png");
const CloseIcon= require("./assets/close.png");
const profileImage = require("./assets/profile.jpg");


export function Profile ({navigation})
{
    const [isCreatePost, setIsCreatePost] = useState(false);

    // fields
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Announcements Input Fields
    const [announcementTitle, setAnnouncementTitle] = useState("");
    const [announcementDetails, setAnnouncementDetails] = useState("");
    const [viewError, setViewError] = useState(0);

    return(
        <View style={{flex:1,padding:20,backgroundColor:"#f9f9f9"}}>
            
          <Text style={StylesHome.TextHeader}>Account Settings</Text>

          <TouchableOpacity onPress={() => {setIsCreatePost(true)}}>
              <Image source={profileImage} style={[StylesHome.ProfileImage]}></Image>
          </TouchableOpacity>

        <StatusBar barStyle="light-content" />
    
        <Text style={[stylesLogin.textHeader, {marginTop:20, alignSelf:'center'}]}>Yafet Tekleab</Text>
        
        {/*EMAIL */}
        <View style={stylesLogin.container}>
          <Text style={stylesLogin.inputLabel}>Email</Text>
          <Text style={styles.timeAgo}>Almonaabdo@gmail.com</Text>
        </View>

        <View style={stylesLogin.container}>
          <Text style={stylesLogin.inputLabel}>Password</Text>
          <Text style={styles.timeAgo}>*********</Text>
        </View>

        {/* SPACING */}
        <View style={{marginVertical:60}}>

        </View>
        {/* LOGIN BUTTON*/}
        <LoginButton text="Logout" onPress={() => isFormValid()}/>

        </View>
    );

}

const styles = StyleSheet.create({
    timeAgo: 
    {
      fontSize: 16,
      color: '#aaa',
    }
  });