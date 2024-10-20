import {React,useState} from "react";
import {View, Text,Image, TouchableOpacity, StatusBar} from "react-native";
import { Linking } from "react-native";
// custom
import { StylesHome } from "./styles/stylesHome.js";
import { stylesContact } from "./styles/StylesContact.js";

// icons
const emailicon = require("./assets/emailIcon.png");
const calllIcon = require("./assets/callIcon.png");
const mapsIcon = require("./assets/mapsIcon.png");




export function Contact ({navigation})
{
    const [isCreatePost, setIsCreatePost] = useState(false);
    const leasingOfficeAddress = "150 University Ave W. - Unit 4, Waterloo";
    const propertyManagmentOffice = "The HUB - 130 Columbia St W, Waterloo";

    return(
        <View style={{flex:1,padding:20,backgroundColor:"#f9f9f9"}}>
          <StatusBar barStyle="light-content" />

          {/* PROPERT MANAGMENT OFFICE */}
          <Text style={[StylesHome.TextHeader, {fontSize:28}]}>Management Office</Text>
          <Text style={stylesContact.header}>Monday - Friday: 10am - 5pm</Text>
          {/* EMAIL */}
          <TouchableOpacity onPress={() => Linking.openURL('mailto:support@example.com?subject=Propert Inspection Request&body=Hello Accommod8u, hope this email finds you well') }title="support@example.com" description>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
              <Image source={emailicon} style={stylesContact.linkIcon}></Image>
              <Text style={stylesContact.linkText}>maintenance@accommod8u.com</Text>
            </View>
          </TouchableOpacity>
          {/* MAPS */}
          <TouchableOpacity onPress={() => {openGoogleMaps(propertyManagmentOffice)}}>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
              <Image source={mapsIcon} style={stylesContact.linkIcon}></Image>
              <Text style={stylesContact.linkText}>The HUB - 130 Columbia St W, Waterloo</Text>
            </View>
          </TouchableOpacity>

          
          <View style={{marginVertical:'10%'}}></View>

          {/* LEASING OFFICE */}
          <Text style={[StylesHome.TextHeader, {fontSize:28}]}>Leasing Office</Text>
          <Text style={stylesContact.header}>Monday - Friday: 10am - 6pm</Text>
          {/* CALL */}
          <TouchableOpacity onPress={() => Linking.openURL(`tel:2268980000`)}>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
              <Image source={calllIcon} style={stylesContact.linkIcon}></Image>
              <Text style={stylesContact.linkText}>+1(226)-898-0000</Text>
            </View>
          </TouchableOpacity>
          {/* EMAIL */}
          <TouchableOpacity onPress={() => Linking.openURL('mailto:support@example.com?subject=Propert Inspection Request&body=Hello Accommod8u, hope this email finds you well') }title="support@example.com" description>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
              <Image source={emailicon} style={stylesContact.linkIcon}></Image>
              <Text style={stylesContact.linkText}>leasing@accommod8u.com</Text>
            </View>
          </TouchableOpacity>
          <View style={{marginVertical:'0.5%'}}></View>
          {/* MAPS */}
          <TouchableOpacity onPress={() => {openGoogleMaps(leasingOfficeAddress)}}>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
              <Image source={mapsIcon} style={stylesContact.linkIcon}></Image>
              <Text style={stylesContact.linkText}>150 University Ave W. - Unit 4, Waterloo</Text>
            </View>
          </TouchableOpacity>

        </View>
    );
}


// function that redirects user to google maps app with the given address
const openGoogleMaps = (address) => 
{
  const formattedAddress = encodeURIComponent(address);
  const url = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
  Linking.openURL(url);
};