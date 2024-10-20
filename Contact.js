import {React,useState} from "react";
import {View, Text,Image, TouchableOpacity, StatusBar} from "react-native";
import { Linking } from "react-native";
// custom
import { StylesHome } from "./styles/stylesHome.js";
import { stylesLogin } from "./styles/stylesLogin.js";
import { LoginButton } from "./components/Buttons.js";

const profileImage = require("./assets/profile.jpg");
const emailicon = require("./assets/emailIcon.png");
const calllIcon = require("./assets/callIcon.png");


export function Contact ({navigation})
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
          <StatusBar barStyle="light-content" />

          <Text style={StylesHome.TextHeader}>Property Management Office</Text>
          <Text style={{fontSize:14, alignSelf:'center'}}>Monday - Friday: 10am - 5pm</Text>

          <TouchableOpacity onPress={() => Linking.openURL('mailto:support@example.com?subject=Propert Inspection Request&body=Hello Accommod8u, hope this email finds you well') }title="support@example.com" description>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
                <Image source={emailicon} style={{width:25, height:25, marginHorizontal:10}}></Image>
                <Text style={{fontSize:14, alignSelf:'center', color:'blue'}}>maintenance@accommod8u.com</Text>
            </View>
          </TouchableOpacity>

          <View style={{marginVertical:20}}></View>

          <Text style={StylesHome.TextHeader}>Leasing Office</Text>
          <Text style={{fontSize:14, alignSelf:'center'}}>Monday - Friday: 10am - 6pm</Text>

          <TouchableOpacity onPress={() => Linking.openURL('mailto:support@example.com?subject=Propert Inspection Request&body=Hello Accommod8u, hope this email finds you well') }title="support@example.com" description>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
                <Image source={emailicon} style={{width:25, height:25, marginHorizontal:10}}></Image>
                <Text style={{fontSize:14, alignSelf:'center', color:'blue'}}>maintenance@accommod8u.com</Text>
            </View>
          </TouchableOpacity>
          <View style={{marginVertical:'0.5%'}}></View>

          <TouchableOpacity onPress={() => Linking.openURL(`tel:2268980000`)}>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
                <Image source={calllIcon} style={{width:25, height:25, marginHorizontal:10}}></Image>
                <Text style={{fontSize:14, alignSelf:'center', color:'blue'}}>+1(226)-898-0000</Text>
            </View>
          </TouchableOpacity>


          {/* SPACING */}
          <View style={{marginVertical:60}}/>

        
          {/* Logout BUTTON*/}
          <LoginButton text="Logout" onPress={() => navigation.navigate("SignOut")} />

        </View>
    );

}