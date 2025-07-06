import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert,
  StyleSheet,
  SafeAreaView 
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../utils/colors';
import { useAuth } from '../../context/AuthContext';
import { spacing, borderRadius, shadows } from '../../utils/designSystem';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();

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
            await logout();
            Alert.alert('Success', 'Logged out successfully!');
          },
        },
      ]
    );
  };

  const settingsItems = [
    {
      icon: 'notifications-outline',
      title: 'Notifications',
      subtitle: 'Manage your notification preferences',
      onPress: () => Alert.alert('Feature', 'Notifications settings coming soon!'),
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Privacy & Security',
      subtitle: 'Control your privacy settings',
      onPress: () => Alert.alert('Feature', 'Privacy settings coming soon!'),
    },
    {
      icon: 'cloud-outline',
      title: 'Storage',
      subtitle: 'Manage your cloud storage',
      onPress: () => Alert.alert('Feature', 'Storage management coming soon!'),
    },
    {
      icon: 'help-circle-outline',
      title: 'Help & Support',
      subtitle: 'Get help and support',
      onPress: () => Alert.alert('Feature', 'Help center coming soon!'),
    },
    {
      icon: 'information-circle-outline',
      title: 'About',
      subtitle: 'App version and information',
      onPress: () => Alert.alert('About', 'DubsWay v1.0.0\nTransform your learning with AI'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Settings Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          {settingsItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.settingItem}
              onPress={item.onPress}
            >
              <View style={styles.settingIcon}>
                <Ionicons name={item.icon} size={20} color={colors.primary} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color={colors.error} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
    marginLeft: spacing.sm,
  },
  settingItem: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  settingSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  logoutButton: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.error + '30',
    ...shadows.sm,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.error,
    marginLeft: spacing.sm,
  },
});

export default SettingsScreen;
