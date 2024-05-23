// Native
import {NavigationContainer, Font} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Image} from "react-native";

// Custom
import { LoginScreen } from './Login';
import { SignUpScreen } from './Signup';
import { HomeScreen } from './Home';
import { StylesHome } from './styles/stylesHome';

const primaryColor = "#60099c"

// screens stack
const Stack = createNativeStackNavigator();

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
      <Stack.Navigator>
        
      {/* HOME SCREEN */}
      <Stack.Screen name="Home" component={HomeScreen} options={defaultScreenOptions}/>

      {/* LOGIN SCREEN */}
      <Stack.Screen name="Login" component={LoginScreen} options={defaultScreenOptions}/>

      {/* SIGN UP SCREEN */}
      <Stack.Screen name="Signup" component={SignUpScreen} options={defaultScreenOptions}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}


