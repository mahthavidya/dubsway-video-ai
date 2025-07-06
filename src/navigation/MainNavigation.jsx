import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home, Profile, LogoutScreen } from '../screens';
import { colors } from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Main navigation using Stack (no drawer opening by default)
const MainNavigation = () => {
  console.log('🎯 MainNavigation: Rendering main navigation');

  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen 
        name="Dashboard" 
        component={Home}
        options={{
          headerTitle: 'Dashboard',
          headerLeft: () => (
            <Ionicons 
              name="menu-outline" 
              size={24} 
              color={colors.text} 
              style={{ marginLeft: 15 }}
            />
          ),
        }}
      />
      <Stack.Screen 
        name="Profile" 
        component={Profile}
        options={{
          headerTitle: 'Profile',
        }}
      />
      <Stack.Screen 
        name="Settings" 
        component={LogoutScreen}
        options={{
          headerTitle: 'Settings',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
