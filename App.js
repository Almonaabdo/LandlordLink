// Native
import {NavigationContainer, Font} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

// Custom
import { LoginScreen } from './Login';
import { SignUpScreen } from './Signup';
import { HomeScreen } from './Home';

const primaryColor = "#60099c"

// screens stack
const Stack = createNativeStackNavigator();

// screen navigator options for all screens
const defaultScreenOptions = 
{
  headerStyle: { backgroundColor: primaryColor },
  headerTintColor: '#fff',
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