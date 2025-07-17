import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from "@react-navigation/native";


// import Home from './Home';
// import HomeScreen from './HomeScreen';

const LogoutScreen = ({setToken}) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // remove token
      
       setToken(null); // update app state
    //   navigation.reset({
    //     index: 0,
    //     routes: [{ name: 'Login' }], // or route to AuthStack entry screen
    //   });
    } catch (error) {
      // Handle logout error silently
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to logout?</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    marginBottom: 16
  }
});
