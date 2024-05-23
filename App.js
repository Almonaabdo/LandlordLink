// Native
import 'react-native-gesture-handler'; // MUST BE FIRST LINE SO APP WORKS DUE TO PACKAGE CONVENTION
import {NavigationContainer, Font} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Image} from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';

// Custom
import { LoginScreen } from './Login';
import { SignUpScreen } from './Signup';
import { HomeScreen } from './Home';
import { StylesHome } from './styles/stylesHome';

const primaryColor = "#60099c"

// screens stack
const Drawer = createDrawerNavigator();

const ImageLogo = require("./assets/logo.jpg");


function LogoTitle()
{
  return (
    <Image
      style={{width:40, height:35, borderRadius:5}}
      source={require('./assets/logo.jpg')}
    />
  );
}


// screen navigator options for all screens
const defaultScreenOptions = 
{
  headerStyle: { backgroundColor: primaryColor },
  headerTintColor: '#fff',
  headerTitle: (props) => <LogoTitle {...props} />
};





export default function App() 
{
  return (
    <NavigationContainer>
      <Drawer.Navigator>
          
        {/* HOME SCREEN */}
        <Drawer.Screen  name="Home" component={HomeScreen} options={defaultScreenOptions}/>

        {/* LOGIN SCREEN */}
        <Drawer.Screen  name="Login" component={LoginScreen} options={defaultScreenOptions}/>

        {/* SIGN UP SCREEN */}
        <Drawer.Screen  name="Signup" component={SignUpScreen} options={defaultScreenOptions}/>

      </Drawer.Navigator>
    </NavigationContainer>


  );
}


