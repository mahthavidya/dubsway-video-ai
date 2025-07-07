import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../utils/colors';
import { spacing, borderRadius, shadows } from '../utils/designSystem';
import { useAuth } from '../context/AuthContext';

const CustomDrawerContent = (props) => {
  const { logout, user } = useAuth();
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };
  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>📚</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.appName}>DubsWay</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@dubsway.com'}</Text>
        </View>
      </LinearGradient>

      {/* Drawer Items */}
      <DrawerContentScrollView 
        {...props} 
        contentContainerStyle={styles.drawerContent}
        showsVerticalScrollIndicator={false}
      >
        <DrawerItemList {...props} />
        {/* Custom Footer Items */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerItem}>
            <Ionicons name="help-circle-outline" size={20} color={colors.textSecondary} />
            <Text style={styles.footerText}>Help & Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem}>
            <Ionicons name="information-circle-outline" size={20} color={colors.textSecondary} />
            <Text style={styles.footerText}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.logoutItem} 
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={20} color={colors.error} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: spacing.xl + 20, // Account for status bar
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.md,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    ...shadows.md,
  },
  logo: {
    fontSize: 24,
    color: colors.primary,
  },
  userInfo: {
    flex: 1,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: 14,
    color: colors.primaryLight,
    opacity: 0.9,
  },
  drawerContent: {
    paddingTop: spacing.lg,
    backgroundColor: colors.background,
  },
  footer: {
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    backgroundColor: colors.background,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    marginHorizontal: spacing.sm,
    marginVertical: spacing.xs,
  },
  footerText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: spacing.md,
    fontWeight: '500',
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.errorLight,
    minHeight: 60,
  },
  logoutText: {
    fontSize: 16,
    color: colors.error,
    marginLeft: spacing.md,
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;
