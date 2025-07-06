// import React from 'react';
// ✅ Correct
import React, { useState } from 'react';

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screen/Home'; 
import Profile from '../screen/Profile';
import LogoutScreen from '../screen/LogoutScreen';






const Drawer = createDrawerNavigator();

const DrawerNavigation = ({setToken}) => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={Home} />
    
    <Drawer.Screen name="Profile" component={Profile} />
    

    <Drawer.Screen name="Logout">
  {props => <LogoutScreen {...props} setToken={setToken} />}
</Drawer.Screen>
  </Drawer.Navigator>
);


export default DrawerNavigation