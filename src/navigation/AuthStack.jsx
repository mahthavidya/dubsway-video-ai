
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/main/HomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import SignUpSuccessScreen from '../screens/auth/SignUpSuccessScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator 
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignUpScreen} />
    <Stack.Screen name="SignupSuccess" component={SignUpSuccessScreen} />
  </Stack.Navigator>
);

export default AuthStack;