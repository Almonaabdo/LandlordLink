import React from 'react';
import { Image, View, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// My custom components
import { Profile } from './Profile';
import { HomeScreen } from './Home';
import { AnnouncementsScreen } from './Announcements';
import { Documents } from './Documents';
import { Contact } from './Contact';
import RequestsScreen from './RequestScreen';
import SignOutScreen from './SignOut'
import SignUpScreen from './Signup';
import { LoginScreen } from './Login';


const primaryColor = "#3e1952";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Importing local icons
const HomeIcon = require("./assets/homeIcon.png");
const ProfileIcon = require("./assets/profileIcon.png");
const AnnouncementIcon = require("./assets/announcementIcon.png");
const DocumentsIcon = require("./assets/documentsIcon.png");
const ContactIcon = require("./assets/contactIcon.png");

// Screen options
const defaultScreenOptions = {
  headerStyle: { backgroundColor: primaryColor },
  headerTintColor: '#fff',
};

// Custom tab bar icon component
const TabIcon = ({ icon, label, focused }) => {
  const iconSize = focused ? 38 : 24;
  return (
    <View style={{ alignItems: 'center' }}>
      <Image source={icon} style={{ width: iconSize, height: iconSize }} />
      <Text style={{ fontSize: 12 }}>{label}</Text>
    </View>
  );
};

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        let icon;
        switch (route.name) {
          case 'Home':
            icon = HomeIcon;
            break;
          case 'Announces':
            icon = AnnouncementIcon;
            break;
          case 'Documents':
            icon = DocumentsIcon;
            break;
          case 'Contact':
            icon = ContactIcon;
            break;
          case 'Profile':
            icon = ProfileIcon;
            break;
          default:
            icon = HomeIcon;
        }
        return <TabIcon icon={icon} label={route.name} focused={focused} />;
      },
      tabBarShowLabel: false,
      tabBarActiveTintColor: primaryColor,
      tabBarInactiveTintColor: '#888',
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopColor: '#ccc',
        borderTopWidth: 1,
      },
    })}>
    <Tab.Screen name="Home" component={HomeScreen} options={defaultScreenOptions} />
    <Tab.Screen name="Documents" component={Documents} options={defaultScreenOptions} />
    <Tab.Screen name="Contact" component={Contact} options={defaultScreenOptions} />
    <Tab.Screen name="Profile" component={Profile} options={defaultScreenOptions} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={defaultScreenOptions} initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Back" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Requests" component={RequestsScreen} options={{ title: 'Requests' }} />
          <Stack.Screen name="Announcements" component={AnnouncementsScreen} options={{ title: 'Announcements' }} />
          <Stack.Screen name="SignOut" component={SignOutScreen} options={{ title: 'SignOut' }} />
          <Stack.Screen name="Signup" component={SignUpScreen} options={{ title: 'SignUp' }} />
                    
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
