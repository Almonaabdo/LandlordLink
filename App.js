// react native
import * as React from 'react';
import { Image, View,Linking, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ScrollView } from 'react-native-gesture-handler';

// my custom components
import { Profile } from './Profile';
import { LoginScreen } from './Login';
import { SignUpScreen } from './Signup';
import { HomeScreen } from './Home';
import { AnnouncementsScreen } from './Announcements';
import { StylesHome } from './styles/stylesHome';
import { stylesLogin } from './styles/stylesLogin';

const primaryColor = "#3e1952";

// screens stack
const Drawer = createDrawerNavigator();

// importing local icons
const ImageLogo = require("./assets/logo.jpg");
const HomeIcon = require("./assets/homeIcon.png");
const ProfileIcon = require("./assets/profileIcon.png");
const AnnouncementIcon = require("./assets/announcementIcon.png");
const DocumentsIcon = require("./assets/documentsIcon.png");



// Custom Drawer Item
const DrawerItem = ({ icon, label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
    <Image source={icon} style={{ width: 24, height: 24, marginRight: 10 }} />
    <Text style={{ fontSize: 16 }}>{label}</Text>
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
    <View style={{ height: '9.82%', backgroundColor: primaryColor, alignItems: 'center',flexDirection:'row'}}>
      <Image source={ImageLogo} style={{height:'55%', width:'18%', marginHorizontal:'4%', alignSelf:'flex-start',  borderRadius:9, marginTop:'12%'}} />
      <Text style={[StylesHome.TextTitle, {marginTop:'12%'}]}>Accommod8u</Text>
    </View>

    <ScrollView>
      <DrawerItem
        icon={HomeIcon}
        label="Home"
        onPress={() => props.navigation.navigate('Home')}
      />
      <DrawerItem
        icon={AnnouncementIcon}
        label="Announcements"
        onPress={() => props.navigation.navigate('Announcements')}
      />

      <DrawerItem
      icon={DocumentsIcon}
        label="Documents"
        onPress={() => props.navigation.navigate('Profile')}
      />
      <DrawerItem
        icon={ProfileIcon}
        label="Profile"
        onPress={() => props.navigation.navigate('Profile')}
      />

      <DrawerItem
        label="Login"
        onPress={() => props.navigation.navigate('Login')}
      />

      <DrawerItem
        label="Signup"
        onPress={() => props.navigation.navigate('Signup')}
      />

    </ScrollView>

    {/* Side menu bottom */}
    <View style={{ height: '12%', backgroundColor: primaryColor}}>
      <Text style={[StylesHome.TextTitle, {marginTop:'3%',marginBottom:'1%',alignSelf:'center'}]}>Any Questions?</Text>
      
      <View style={[stylesLogin.container, {padding:0, margin:0, borderColor:'#fff', height:'50%', width:'80%',alignSelf:'center',borderRadius:5}]}>
        <TouchableOpacity onPress={() => Linking.openURL("https://www.accommod8u.com/")}>
          <Text style={[StylesHome.TextTitle, {alignSelf:'center'}]}>Visit US</Text>
          <Text style={[StylesHome.TextTitle, {alignSelf:'center', fontSize:12}]}>www.accommod8u.com</Text>
        </TouchableOpacity>
      </View>
    </View>


  </View>
);

export default function App() 
{
  return (
    // Screens
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>

        <Drawer.Screen name="Home" component={HomeScreen} options={defaultScreenOptions}/>

        <Drawer.Screen name="Announcements" component={AnnouncementsScreen} options={defaultScreenOptions}/>

        {/* <Drawer.Screen name="Documents" component={Documents} options={defaultScreenOptions}/> */}

        <Drawer.Screen name="Profile" component={Profile} options={defaultScreenOptions}/>
        
        <Drawer.Screen name="Login" component={LoginScreen} options={defaultScreenOptions} />

        <Drawer.Screen name="Signup" component={SignUpScreen} options={defaultScreenOptions} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}