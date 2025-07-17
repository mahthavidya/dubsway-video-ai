import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  StatusBar,
  SafeAreaView,
  Alert,
  RefreshControl,
  FlatList,
  Dimensions
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../utils/colors';
import { spacing, borderRadius, shadows } from '../../utils/designSystem';
import { StyleSheet } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import ApiService from '../../services/api';
import VideoPlayer from '../../components/VideoPlayer';
import VideoThumbnail from '../../components/VideoThumbnail';

const Home = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [recentUploads, setRecentUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoPlayerVisible, setVideoPlayerVisible] = useState(false);

  // Get user's first name for personalization
  const getUserFirstName = () => {
    if (user?.email) {
      // Extract name from email (before @ symbol)
      const namePart = user.email.split('@')[0];
      // Capitalize first letter and clean up
      return namePart.charAt(0).toUpperCase() + namePart.slice(1).replace(/[._]/g, ' ');
    }
    return 'User';
  };

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const data = await ApiService.getUserDashboard();
      
      if (data && Array.isArray(data)) {
        // Filter out any items with problematic data
        const cleanData = data.filter(item => {
          const isValid = item && 
                 typeof item === 'object' && 
                 item.id && 
                 item.id !== '.' &&
                 item.id !== '' &&
                 (!item.status || (typeof item.status === 'string' && item.status.trim() !== '.' && item.status.trim() !== '')) &&
                 (!item.pdf_url || (typeof item.pdf_url === 'string' && item.pdf_url !== '.')) &&
                 (!item.video_url || (typeof item.video_url === 'string' && item.video_url.trim() !== '.' && item.video_url.trim() !== ''));
          
          return isValid;
        });
        
        setRecentUploads(cleanData);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch dashboard data: ' + error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchDashboardData();
    } catch (error) {
      // Error is already handled in fetchDashboardData
    }
  };

  const formatDate = (dateString) => {
    if (!dateString || typeof dateString !== 'string' || dateString.trim() === '' || dateString === '.') {
      return 'Unknown date';
    }
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        return 'Today';
      } else if (diffDays === 2) {
        return 'Yesterday';
      } else if (diffDays <= 7) {
        return `${diffDays - 1} days ago`;
      } else {
        return date.toLocaleDateString();
      }
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getVideoTitle = (videoUrl) => {
    if (!videoUrl || typeof videoUrl !== 'string' || videoUrl.trim() === '' || videoUrl === '.') {
      return 'Untitled Video';
    }
    
    try {
      // Extract filename from URL
      const urlParts = videoUrl.split('/');
      const filename = urlParts[urlParts.length - 1];
      
      // Remove file extension and decode URL
      const titleWithoutExt = filename.replace(/\.[^/.]+$/, '');
      
      const decoded = decodeURIComponent(titleWithoutExt);
      
      // Return default if result is empty or just punctuation
      const finalTitle = (decoded && decoded.trim() && decoded.trim() !== '.') ? decoded : 'Untitled Video';
      
      return finalTitle;
    } catch (error) {
      return 'Untitled Video';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'checkmark-circle';
      case 'processing':
        return 'time';
      case 'pending':
        return 'hourglass';
      case 'failed':
        return 'alert-circle';
      default:
        return 'document';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return colors.success || '#4CAF50';
      case 'processing':
        return colors.warning || '#FF9800';
      case 'pending':
        return colors.info || '#2196F3';
      case 'failed':
        return colors.error || '#F44336';
      default:
        return colors.textLight;
    }
  };

  const handleUpload = (type) => {
    navigation.navigate('VideoUpload');
  };

  const handleRecentItem = (item) => {
    setSelectedVideo(item);
    setVideoPlayerVisible(true);
  };

  const closeVideoPlayer = () => {
    setVideoPlayerVisible(false);
    setSelectedVideo(null);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'list' ? 'grid' : 'list');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary, colors.secondary, colors.accent]}
            tintColor={colors.primary}
            title="Pull to refresh"
            titleColor={colors.textSecondary}
          />
        }
      >
        {/* Header */}
        <LinearGradient
          colors={[colors.primary, colors.primaryDark, colors.gradientAccent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View>
            <Text style={styles.greeting}>Good Morning, {getUserFirstName()}!</Text>
            <Text style={styles.username}>Ready to learn?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={{fontSize: 20, color: colors.white, fontWeight: '600'}}>
              {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Upload</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity 
              style={[styles.actionCard, styles.videoCard]}
              onPress={() => handleUpload('Video')}
            >
              <View style={styles.actionIcon}>
                <Text style={{fontSize: 20, color: colors.white}}>Video</Text>
              </View>
              <Text style={styles.actionTitle}>Upload Video</Text>
              <Text style={styles.actionSubtitle}>Convert video to PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionCard, styles.audioCard]}
              onPress={() => handleUpload('Audio')}
            >
              <View style={styles.actionIcon}>
                <Text style={{fontSize: 20, color: colors.white}}>Audio</Text>
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
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={toggleViewMode} style={styles.viewToggle}>
                <Text style={{fontSize: 16, color: colors.primary}}>
                  {viewMode === 'list' ? 'Grid' : 'List'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading your uploads...</Text>
            </View>
          ) : recentUploads.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={{fontSize: 40, color: colors.textLight}}>No uploads</Text>
              <Text style={styles.emptyText}>No uploads yet</Text>
              <Text style={styles.emptySubtext}>Upload your first video to get started</Text>
            </View>
          ) : viewMode === 'grid' ? (
            <FlatList
              data={recentUploads}
              numColumns={2}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.gridContainer}
              columnWrapperStyle={styles.gridRow}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <VideoThumbnail
                  videoUrl={item.video_url}
                  pdfUrl={item.pdf_url}
                  title={getVideoTitle(item.video_url)}
                  status={item.status}
                  createdAt={item.created_at}
                  onPlay={() => handleRecentItem(item)}
                />
              )}
            />
          ) : (
            <View>
              {recentUploads.map((item, index) => {
                // Validate item before rendering
                if (!item || !item.id || !item.video_url) {
                  return null;
                }
                
                const safeTitle = getVideoTitle(item.video_url) || 'Untitled Video';
                const safeStatus = (item.status && typeof item.status === 'string' && item.status.trim()) || 'Unknown';
                const safeDate = formatDate(item.created_at) || 'Unknown date';
                
                return (
                  <TouchableOpacity 
                    key={`video-${item.id}`}
                    style={styles.recentItem}
                    onPress={() => handleRecentItem(item)}
                  >
                    <View style={styles.recentIcon}>
                      <Ionicons 
                        name={getStatusIcon(safeStatus)} 
                        size={20} 
                        color={getStatusColor(safeStatus)} 
                      />
                    </View>
                    <View style={styles.recentContent}>
                      <Text style={styles.recentTitle} numberOfLines={1}>
                        {safeTitle}
                      </Text>
                      <View style={styles.recentMetadata}>
                        <Text style={[styles.recentStatus, { color: getStatusColor(safeStatus) }]}>
                          {safeStatus}
                        </Text>
                        <Text style={styles.metadataSeparator}>•</Text>
                        <Text style={styles.recentDate}>{safeDate}</Text>
                      </View>
                    </View>
                    <View style={styles.recentActions}>
                      <Ionicons name="play-circle" size={24} color={colors.primary} />
                      <Feather name="chevron-right" size={16} color={colors.textLight} />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{recentUploads.length}</Text>
              <Text style={styles.statLabel}>Videos</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {recentUploads.filter(item => item.status === 'completed').length}
              </Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {recentUploads.filter(item => item.status === 'pending' || item.status === 'processing').length}
              </Text>
              <Text style={styles.statLabel}>Processing</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayer
          visible={videoPlayerVisible}
          videoUrl={selectedVideo.video_url}
          pdfUrl={selectedVideo.pdf_url}
          title={getVideoTitle(selectedVideo.video_url)}
          onClose={closeVideoPlayer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.accentLight,
    ...shadows.md,
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
    width: 60,
    height: 60,
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  viewToggle: {
    padding: spacing.xs,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.gray200,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  recentItem: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  recentIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primaryLight,
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
  recentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  pdfIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  pdfText: {
    fontSize: 11,
    color: colors.success,
    fontWeight: '500',
  },
  gridContainer: {
    paddingVertical: spacing.sm,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  recentMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  metadataSeparator: {
    fontSize: 12,
    color: colors.textLight,
    marginHorizontal: spacing.xs,
  },
  recentStatus: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  loadingContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: spacing.xs,
    textAlign: 'center',
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
