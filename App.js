// react native
import * as React from 'react';
import { Image, View,Linking, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ScrollView } from 'react-native-gesture-handler';
import { Documents } from "./Documents";

// my custom components
import { Profile } from './Profile';
import { LoginScreen } from './Login';
import { SignUpScreen } from './Signup';
import { HomeScreen } from './Home';
import { AnnouncementsScreen } from './Announcements';
import { StylesHome } from './styles/stylesHome';

const primaryColor = "#3e1952";

// screens stack
const Drawer = createDrawerNavigator();

// importing local icons
const ImageLogo = require("./assets/logo.jpg");
const HomeIcon = require("./assets/homeIcon.png");
const ProfileIcon = require("./assets/profileIcon.png");
const AnnouncementIcon = require("./assets/announcementIcon.png");
const DocumentsIcon = require("./assets/documentsIcon.png");



// divides items in the nav menu
const Divider = () => (
  <View style={{
    height: 1,
    backgroundColor: '#E0E0E0', 
    marginVertical: 1,
  }} />
);

// Custom Drawer Item
const DrawerItem = ({ icon, label, onPress, size }) => (
  <TouchableOpacity onPress={onPress} style={{padding: label==="Profile" ? 1 : 10}}>
    <View style=
    {{
      flexDirection: 'row',
      alignItems: 'center',
      padding: label==="Profile" ? 12 : 2,
      borderRadius: 5,
      backgroundColor: label === "Profile" ? '#D1C4E9' : 'transparent',
    }}>
      <Image source={icon} style={{ width: size || 24, height: size || 24, marginRight: 10 }} />
      <Text style={{ fontSize: label === "Profile" ? 26 : 20 }}>{label}</Text>
    </View>
  </TouchableOpacity>
);

// screen options
const defaultScreenOptions = 
{
  headerStyle: { backgroundColor: primaryColor },
  headerTintColor: '#fff',
  //headerTitle: (props) => <LogoTitle {...props} /> // puts an icon in center title bar
};

// Custom Side Menu
const CustomDrawerContent = (props) => (
  <View style={{ flex: 1 }}>

    {/* Side menu top */}
    <View style={{ height: '10%', backgroundColor: primaryColor,flexDirection:'row'}}>
      <Image source={ImageLogo} style={{height:'55%', width:'18%', marginHorizontal:'4%', alignSelf:'flex-start',  borderRadius:9, marginTop:'12%'}} />
      <Text style={[StylesHome.TextTitle, {marginTop:'20%'}]}>Accommod8u</Text>
    </View>

    {/*NAVBAR ITEMS */}
    <ScrollView>
      <DrawerItem icon={HomeIcon} label="Home" onPress={() => props.navigation.navigate('Home')} size={28} />
      <Divider />
      <DrawerItem icon={AnnouncementIcon} label="Announcements" onPress={() => props.navigation.navigate('Announcements')} size={28} />
      <Divider />
      <DrawerItem icon={DocumentsIcon} label="Documents" onPress={() => props.navigation.navigate('Documents')} size={28}/>
      <Divider />
      {/*
      <DrawerItem label="Login" onPress={() => props.navigation.navigate('Login')}size={28} />
      <Divider />
      <DrawerItem label="Signup" onPress={() => props.navigation.navigate('Signup')} size={28}/>
      <Divider />
      */}
    </ScrollView>

    <DrawerItem icon={ProfileIcon} label="Profile" onPress={() => props.navigation.navigate('Profile')} size={36}/>

    {/* Side menu bottom */}
    <View style={{ height: '12%', backgroundColor: primaryColor}}>
      <Text style={[StylesHome.TextTitle, {marginTop:'3%',marginBottom:'1%',alignSelf:'center'}]}>Any Questions?</Text>
      <TouchableOpacity onPress={() => Linking.openURL("https://www.accommod8u.com/")}>
        <Text style={[StylesHome.TextTitle, {alignSelf:'center'}]}>Visit US</Text>
        <Text style={[StylesHome.TextTitle, {alignSelf:'center', fontSize:12}]}>www.accommod8u.com</Text>
        <Text style={[StylesHome.TextTitle, {alignSelf:'center', fontSize:12}]}>+1(226)-898-0000</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function App() 
{
  return (
    // APP Screens
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      
        <Drawer.Screen name="Login" component={LoginScreen} options={{defaultScreenOptions, headerShown: false}} />
        <Drawer.Screen name="Home" component={HomeScreen} options={defaultScreenOptions}/>
        <Drawer.Screen name="Announcements" component={AnnouncementsScreen} options={defaultScreenOptions}/>
        <Drawer.Screen name="Documents" component={Documents} options={defaultScreenOptions}/>
        <Drawer.Screen name="Profile" component={Profile} options={defaultScreenOptions}/>
        <Drawer.Screen name="Signup" component={SignUpScreen} options={{defaultScreenOptions, headerShown: false}} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}