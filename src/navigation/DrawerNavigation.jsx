import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/main/Home'; 
import Profile from '../screens/main/Profile';
import VideoUploadExample from '../components/VideoUploadExample';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { colors } from '../utils/colors';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary,
        elevation: 4,
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      headerTintColor: colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 18,
      },
      drawerActiveTintColor: colors.primary,
      drawerInactiveTintColor: colors.textSecondary,
      drawerActiveBackgroundColor: colors.primaryLight + '20',
    }}
  >
    <Drawer.Screen 
      name="Home" 
      component={Home}
      options={{
        title: 'Dashboard'
      }}
    />
    <Drawer.Screen 
      name="VideoUpload" 
      component={VideoUploadExample}
      options={{
        title: 'Upload Video'
      }}
    />
    <Drawer.Screen 
      name="Profile" 
      component={Profile}
      options={{
        title: 'My Profile'
      }}
    />
  </Drawer.Navigator>
);

export default DrawerNavigation;