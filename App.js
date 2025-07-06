
// import React, { useState ,useEffect} from 'react';
// // import { StatusBar } from 'expo-status-bar';
// // import { StyleSheet, Text, View } from 'react-native';
// // import React,{useEffect,useState} from 'react';
// // import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// // import HomeScreen from './src/screen/HomeScreen';

// // import Home from './src/screen/Home';
// // import Profile from './src/screen/Profile';
// // import LoginScreen from './src/screen/LoginScreen';
// // import SignUpScreen from './src/screen/SignUpScreen';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AuthStack from './src/navigation/AuthStack';
// import DrawerNavigation from './src/navigation/DrawerNavigation';

 



 


// // const Drawer = createDrawerNavigator();

// // const Stack = createNativeStackNavigator();



// // const AppDrawer = () => (
// //   <Drawer.Navigator>
// //     <Drawer.Screen name="Home" component={Home} />
// //     <Drawer.Screen name="Profile" component={Profile} />
// //   </Drawer.Navigator>
// // );

// // const AuthStack = () => (
// //   <Stack.Navigator screenOptions={{ headerShown: false }}>
// //     <Stack.Screen name="Login" component={LoginScreen} />
// //     <Stack.Screen name="Signup" component={SignUpScreen} />
// //     <Stack.Screen name="HomeScreen" component={HomeScreen} />
// //   </Stack.Navigator>
// // );

// const App = () => {

// const [token, setToken] = useState(null);

//   useEffect(() => {
//     console.log('useEffect is called when component mounts');
//     const verifyToken = async () => {
//       try{
//  const value = await AsyncStorage.getItem('userToken');
//  if(value !== null){
//     console.log("token",value)
// setToken(value)
//  }

//       }
//       catch(e){
//         console.log("Failed to retireve token",e)
//       }
//      };

    
//     verifyToken();
   
//   },[]);

//     useEffect(()=>{
// if(token && token !== null){
//   console.log("token",token)
// }
//   },[token])
//   // const isLoggedIn = true; // Change to your auth state

//   return (
//     <NavigationContainer>
//        {token ? <DrawerNavigation /> : <AuthStack />}
//       {/* {token && token !== null  ? <DrawerNavigation /> : <AuthStack />} */}
//     </NavigationContainer>
//   );
// };

// export default App;


// export default function App() {
 
//   //    const isLoggedIn = false; // Change to your auth state

//   return (
//   //   <NavigationContainer>
//   //     {isLoggedIn ? <AppDrawer /> : <AuthStack />}
//   //   </NavigationContainer>
//   // );
//     <NavigationContainer>
      
//        <Drawer.Navigator>
//        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
//       <Drawer.Screen name="Home" component={Home} />
//        <Drawer.Screen name="Profile" component={Profile} /> 
//        <Drawer.Screen name="Login" component={LoginScreen} /> 
//          <Drawer.Screen name="Signup" component={SignUpScreen} /> 
//     </Drawer.Navigator>

//      </NavigationContainer>
//   )
  
// }

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './src/navigation/AuthStack';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import { View, StyleSheet } from 'react-native';

const App = () => {
  const [token, setToken] = useState(null);

  React.useEffect(() => {
    const verifyToken = async () => {
      try {
        const value = await AsyncStorage.getItem('userToken');
        if (value !== null) {
          setToken(value);
        }
      } catch (e) {
        console.log('Failed to retrieve token', e);
      }
    };

    verifyToken();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {token ? <DrawerNavigation  setToken={setToken}/> : <AuthStack   setToken={setToken}/>}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

