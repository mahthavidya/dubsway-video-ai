

// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ✅ Correct
import React, { useState } from 'react';

// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from '../screen/LoginScreen';
import SignUpScreen from '../screen/SignUpScreen';

const Stack = createNativeStackNavigator();




const AuthStack = ({setToken}) => (
  <Stack.Navigator>
    {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
    {/* <Stack.Screen name="Signup" component={SignUpScreen} /> */}

      <Stack.Screen name="Login">
  {props => <LoginScreen {...props} setToken={setToken} />}
</Stack.Screen>
    <Stack.Screen name="Signup">
  {props => <SignUpScreen {...props} setToken={setToken} />}
</Stack.Screen>
  </Stack.Navigator>
);

export default AuthStack