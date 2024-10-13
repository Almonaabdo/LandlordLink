// Native
import * as React from 'react';
import {Image, Linking} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, ScrollView,Modal, TextInput,StatusBar} from "react-native";
import { Profile } from './Profile';
// Custom
import { LoginScreen } from './Login';
import { SignUpScreen } from './Signup';
import { HomeScreen } from './Home';
import { AnnouncementsScreen } from './Announcements';
import { TouchableOpacity } from 'react-native-gesture-handler';

const primaryColor = "#60099c"

// screens stack
const Drawer = createDrawerNavigator();


const ImageLogo = require("./assets/logo.jpg");
const HomeIcon = require("./assets/homeIcon.png");

const ProfileIcon = require("./assets/profileIcon.png")
const AnnouncementIcon = require("./assets/announcementIcon.png")

function LogoTitle()
{
  return (
    <TouchableOpacity onPress={() => {Linking.openURL("https://www.accommod8u.com/")}}>
      <Image style={{width:40, height:35, borderRadius:5}}
        source={require('./assets/logo.jpg')}/>
    </TouchableOpacity>
  );
}

// screen navigator options for all screens
const defaultScreenOptions = 
{
  headerStyle: { backgroundColor: primaryColor },
  headerTintColor: '#fff',
  headerTitle: (props) => <LogoTitle {...props} /> // puts an icon in center title bar
};


// Custom Drawer Item
const DrawerItem = ({ icon, label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
    <Image source={icon} style={{ width: 24, height: 24, marginRight: 10 }} />
    <Text style={{ fontSize: 16 }}>{label}</Text>
  </TouchableOpacity>
);


export default function App() 
{
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(true);

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {isUserLoggedIn && 
        (
          
          <Drawer.Screen 
          name="Home" 
          component={HomeScreen} 
          options=
          {{ 
            drawerLabel: () => 
            (
              <DrawerItem 
                icon={HomeIcon} 
                label="Home"/>
            ),
            headerStyle: { backgroundColor: primaryColor },
            headerTintColor: '#fff',
          }} 
        />
        )}
          
        {/* LOGIN SCREEN */}
        <Drawer.Screen  name="Login" component={LoginScreen} options={defaultScreenOptions}/>

        {/* SIGN UP SCREEN */}
        <Drawer.Screen  name="Signup" component={SignUpScreen} options={defaultScreenOptions}/>

        {/* Announcements SCREEN */}
        <Drawer.Screen  name="Announcements" component={AnnouncementsScreen} options={{drawerLabel: () => 
          (
            <DrawerItem 
              icon={AnnouncementIcon} 
              label="Announcements"
              />
          ),
          headerStyle: { backgroundColor: primaryColor },
          headerTintColor: '#fff',
          }}/>


        <Drawer.Screen 
          name="Profile" 
          component={Profile} 
          options=
          {{ 
            drawerLabel: () => 
            (
              <DrawerItem 
                icon={ProfileIcon} 
                label="Profile"/>
            ),
            headerStyle: { backgroundColor: primaryColor },
            headerTintColor: '#fff',
          }} 
        />


      </Drawer.Navigator>
    </NavigationContainer>
  );
}


