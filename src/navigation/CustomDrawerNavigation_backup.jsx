import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Home, Profile, LogoutScreen } from '../screens';
import VideoUploadExample from '../components/VideoUploadExample';
import { colors } from '../utils/colors';
import { useAuth } from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

// Custom Drawer Overlay Component with Optimized Animations
const CustomDrawerOverlay = ({ isOpen, onClose, onNavigate, onLogout, currentRoute }) => {
  const slideAnim = useRef(new Animated.Value(-280)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Open animations
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Close animations
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -280,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        // Only hide component after animation completes
        if (finished) {
          setIsVisible(false);
        }
      });
    }
  }, [isOpen, slideAnim, backdropAnim]);

  // Don't render anything if not visible
  if (!isVisible) return null;

  const menuItems = [
    { name: 'Home', label: 'Dashboard', icon: 'home-outline' },
    { name: 'VideoUpload', label: 'Upload Video', icon: 'videocam-outline' },
    { name: 'Profile', label: 'Profile', icon: 'person-outline' },
    { name: 'Settings', label: 'Settings', icon: 'settings-outline' },
  ];

  return (
    <View style={styles.overlay}>
      <Animated.View 
        style={[
          styles.backdrop, 
          { opacity: backdropAnim }
        ]}
      >
        <TouchableOpacity 
          style={styles.backdropTouch} 
          onPress={onClose} 
          activeOpacity={1}
        />
      </Animated.View>
      
      <Animated.View 
        style={[
          styles.drawer,
          {
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        <View style={styles.drawerHeader}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.drawerContent}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={[
                styles.drawerItem,
                currentRoute === item.name && styles.drawerItemActive
              ]}
              onPress={() => onNavigate(item.name)}
            >
              <Ionicons 
                name={item.icon} 
                size={20} 
                color={currentRoute === item.name ? colors.primary : colors.text} 
              />
              <Text style={[
                styles.drawerItemText,
                currentRoute === item.name && styles.drawerItemTextActive
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
          
          {/* Logout Button */}
          <View style={styles.logoutSection}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={onLogout}
            >
              <Ionicons 
                name="log-out-outline" 
                size={20} 
                color="#ff4444" 
              />
              <Text style={styles.logoutText}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

// Custom Stack Navigator with Drawer Overlay
const CustomDrawerNavigationContent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('Home');
  const { logout } = useAuth();
  const navigation = useNavigation();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const navigateToScreen = (screenName) => {
    console.log(`🧭 Navigating to: ${screenName}`);
    setCurrentRoute(screenName);
    closeDrawer();
    navigation.navigate(screenName);
  };

  const handleLogout = async () => {
    try {
      closeDrawer();
      console.log('🚪 Logging out user...');
      await logout();
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout error:', error);
    }
  };

  const CustomHeader = ({ title, route }) => {
    return {
      headerTitle: title,
      headerLeft: () => (
        <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: colors.primary,
        // Add extra height for iOS devices with notch
        height: Platform.OS === 'ios' ? 100 : 56,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  return (
    <View style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={() => CustomHeader({ title: 'Dashboard', route: 'Home' })}
        />
        <Stack.Screen 
          name="VideoUpload" 
          component={VideoUploadExample}
          options={() => CustomHeader({ title: 'Upload Video', route: 'VideoUpload' })}
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile}
          options={() => CustomHeader({ title: 'Profile', route: 'Profile' })}
        />
        <Stack.Screen 
          name="Settings" 
          component={LogoutScreen}
          options={() => CustomHeader({ title: 'Settings', route: 'Settings' })}
        />
      </Stack.Navigator>
      
      <CustomDrawerOverlay
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onNavigate={navigateToScreen}
        onLogout={handleLogout}
        currentRoute={currentRoute}
      />
    </View>
  );
};

const CustomDrawerNavigation = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          // Global header configuration for safe areas
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={() => CustomHeader({ title: 'Dashboard', route: 'Home' })}
        />
        <Stack.Screen 
          name="VideoUpload" 
          component={VideoUploadExample}
          options={() => CustomHeader({ title: 'Upload Video', route: 'VideoUpload' })}
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile}
          options={() => CustomHeader({ title: 'Profile', route: 'Profile' })}
        />
        <Stack.Screen 
          name="Settings" 
          component={LogoutScreen}
          options={() => CustomHeader({ title: 'Settings', route: 'Settings' })}
        />
      </Stack.Navigator>
      
      <NavigationHandler>
        <CustomDrawerOverlay
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          onLogout={handleLogout}
          currentRoute={currentRoute}
        />
      </NavigationHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropTouch: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 280,
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    // Remove any transform from here as it's handled by Animated.View
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  closeButton: {
    padding: 8,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  drawerItemActive: {
    backgroundColor: colors.primary + '15',
  },
  drawerItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: colors.text,
  },
  drawerItemTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  logoutSection: {
    marginTop: 'auto',
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border || '#e0e0e0',
    paddingTop: 20,
    marginHorizontal: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: '#ffebee',
  },
  logoutText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#ff4444',
    fontWeight: '600',
  },
  menuButton: {
    marginLeft: 15,
    padding: 5,
    // Add extra top margin for iOS devices
    marginTop: Platform.OS === 'ios' ? 10 : 0,
  },
});

export default CustomDrawerNavigation;
