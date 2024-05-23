// Native
import * as React from 'react';
import {Image, Linking} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Custom
import { LoginScreen } from './Login';
import { SignUpScreen } from './Signup';
import { HomeScreen } from './Home';
import { StylesHome } from './styles/stylesHome';
import { TouchableOpacity } from 'react-native-gesture-handler';

const primaryColor = "#60099c"

// screens stack
const Drawer = createDrawerNavigator();

const ImageLogo = require("./assets/logo.jpg");

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
  headerTitle: (props) => <LogoTitle {...props} />
};


export default function App() 
{
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(true);

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {isUserLoggedIn && 
        (
          <Drawer.Screen  name="Home" component={HomeScreen} options={defaultScreenOptions} />
        )}
          
        {/* LOGIN SCREEN */}
        <Drawer.Screen  name="Login" component={LoginScreen} options={[defaultScreenOptions]}/>

        {/* SIGN UP SCREEN */}
        <Drawer.Screen  name="Signup" component={SignUpScreen} options={defaultScreenOptions}/>

      </Drawer.Navigator>
    </NavigationContainer>
  );
}


