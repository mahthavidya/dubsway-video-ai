import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  StatusBar,
  SafeAreaView,
  Alert
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../../utils/colors';
import { spacing, borderRadius, shadows } from '../../utils/designSystem';
import { StyleSheet } from 'react-native';

const Home = () => {
  const navigation = useNavigation();
  const [recentUploads] = useState([
    { id: 1, title: 'Chemistry Lecture 1', type: 'video', date: '2 hours ago' },
    { id: 2, title: 'Physics Notes', type: 'audio', date: '1 day ago' },
    { id: 3, title: 'Math Tutorial', type: 'video', date: '3 days ago' },
  ]);

  const handleUpload = (type) => {
    Alert.alert(
      'Upload Feature',
      `${type} upload feature will be implemented here`,
      [{ text: 'OK' }]
    );
  };

  const handleRecentItem = (item) => {
    Alert.alert(
      'View Document',
      `Opening ${item.title}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning! 👋</Text>
            <Text style={styles.username}>Ready to learn?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={40} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Upload</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity 
              style={[styles.actionCard, styles.videoCard]}
              onPress={() => handleUpload('Video')}
            >
              <View style={styles.actionIcon}>
                <Ionicons name="videocam" size={24} color={colors.white} />
              </View>
              <Text style={styles.actionTitle}>Upload Video</Text>
              <Text style={styles.actionSubtitle}>Convert video to PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionCard, styles.audioCard]}
              onPress={() => handleUpload('Audio')}
            >
              <View style={styles.actionIcon}>
                <Ionicons name="mic" size={24} color={colors.white} />
              </View>
              <Text style={styles.actionTitle}>Upload Audio</Text>
              <Text style={styles.actionSubtitle}>Convert audio to PDF</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Uploads */}
        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Uploads</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {recentUploads.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.recentItem}
              onPress={() => handleRecentItem(item)}
            >
              <View style={styles.recentIcon}>
                <Ionicons 
                  name={item.type === 'video' ? 'videocam' : 'mic'} 
                  size={20} 
                  color={colors.primary} 
                />
              </View>
              <View style={styles.recentContent}>
                <Text style={styles.recentTitle}>{item.title}</Text>
                <Text style={styles.recentDate}>{item.date}</Text>
              </View>
              <Feather name="chevron-right" size={20} color={colors.textLight} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Documents</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>24h</Text>
              <Text style={styles.statLabel}>Content</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>85%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    borderBottomLeftRadius: borderRadius['2xl'],
    borderBottomRightRadius: borderRadius['2xl'],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.md,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: spacing.xs,
  },
  username: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
  },
  profileButton: {
    padding: spacing.sm,
  },
  quickActions: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  actionCard: {
    flex: 1,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    ...shadows.md,
  },
  videoCard: {
    backgroundColor: colors.primary,
  },
  audioCard: {
    backgroundColor: colors.secondary,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginBottom: spacing.xs,
  },
  actionSubtitle: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.8,
    textAlign: 'center',
  },
  recentSection: {
    padding: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  recentItem: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  recentIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  recentContent: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  recentDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statsSection: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    ...shadows.sm,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});

export default Home;
