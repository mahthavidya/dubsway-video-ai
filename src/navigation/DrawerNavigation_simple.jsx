import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home, Profile, LogoutScreen } from '../screens';
import { colors } from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return <CustomDrawerContent {...props} />;
      }}
      initialRouteName="Dashboard"
      backBehavior="none"
      screenOptions={{
        // Drawer configuration - moved to top level
        drawerType: 'front',
        swipeEnabled: true,
        
        // Header styling
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
        
        // Drawer styling
        drawerStyle: {
          backgroundColor: colors.background,
          width: 300,
        },
        drawerActiveBackgroundColor: colors.primary + '15',
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '500',
          marginLeft: -10, // Reduced from -20 to fix overlap
        },
        drawerItemStyle: {
          marginVertical: 2,
          borderRadius: 12,
          paddingHorizontal: 16,
          marginHorizontal: 12,
        },
      }}
    >
      <Drawer.Screen 
        name="Dashboard" 
        component={Home}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          headerTitle: 'Dashboard',
        }}
      />
      <Drawer.Screen 
        name="My Documents" 
        component={Profile}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Upload History" 
        component={LogoutScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cloud-upload-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Profile" 
        component={Profile}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={LogoutScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
