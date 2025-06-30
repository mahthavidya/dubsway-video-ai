import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screen/HomeScreen';

import Home from './src/screen/Home';
import Profile from './src/screen/Profile';
import LoginScreen from './src/screen/LoginScreen';
import SignUpScreen from './src/screen/SignUpScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      
       <Drawer.Navigator>
       <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="Home" component={Home} />
       <Drawer.Screen name="Profile" component={Profile} /> 
       <Drawer.Screen name="Login" component={LoginScreen} /> 
         <Drawer.Screen name="Signup" component={SignUpScreen} /> 
    </Drawer.Navigator>

     </NavigationContainer>
  );
}


