import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/colors';
import { spacing, borderRadius, shadows } from '../utils/designSystem';

const CustomDrawerContent = (props) => {
  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>📚</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.appName}>DubsWay</Text>
          <Text style={styles.userEmail}>student@dubsway.com</Text>
        </View>
      </View>

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
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.background,
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
    width: 50,
    height: 50,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  logo: {
    fontSize: 24,
    color: colors.white,
  },
  userInfo: {
    flex: 1,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary,
    opacity: 0.9,
  },
  drawerContent: {
    paddingTop: spacing.lg,
  },
  footer: {
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  footerText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: spacing.md,
  },
});

export default CustomDrawerContent;
