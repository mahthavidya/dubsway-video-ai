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

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const data = await ApiService.getUserDashboard();
      if (data && Array.isArray(data)) {
        setRecentUploads(data);
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
    await fetchDashboardData();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
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
  };

  const getVideoTitle = (videoUrl) => {
    if (!videoUrl) return 'Untitled Video';
    
    // Extract filename from URL
    const urlParts = videoUrl.split('/');
    const filename = urlParts[urlParts.length - 1];
    
    // Remove file extension and decode URL
    const titleWithoutExt = filename.replace(/\.[^/.]+$/, '');
    return decodeURIComponent(titleWithoutExt);
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
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning! 👋</Text>
            <Text style={styles.username}>Ready to learn?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={{fontSize: 30, color: colors.white}}>👤</Text>
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
                <Text style={{fontSize: 20, color: colors.white}}>🎥</Text>
              </View>
              <Text style={styles.actionTitle}>Upload Video</Text>
              <Text style={styles.actionSubtitle}>Convert video to PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionCard, styles.audioCard]}
              onPress={() => handleUpload('Audio')}
            >
              <View style={styles.actionIcon}>
                <Text style={{fontSize: 20, color: colors.white}}>🎤</Text>
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
                  {viewMode === 'list' ? '⊞' : '☰'}
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
              <Text style={{fontSize: 40, color: colors.textLight}}>☁️</Text>
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
            recentUploads.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.recentItem}
                onPress={() => handleRecentItem(item)}
              >
                <View style={styles.recentIcon}>
                  <Ionicons 
                    name={getStatusIcon(item.status)} 
                    size={20} 
                    color={getStatusColor(item.status)} 
                  />
                </View>
                <View style={styles.recentContent}>
                  <Text style={styles.recentTitle} numberOfLines={1}>
                    {getVideoTitle(item.video_url)}
                  </Text>
                  <View style={styles.recentMetadata}>
                    <Text style={styles.recentDate}>{formatDate(item.created_at)}</Text>
                    <Text style={[styles.recentStatus, { color: getStatusColor(item.status) }]}>
                      {item.status}
                    </Text>
                  </View>
                  {item.pdf_url && (
                    <View style={styles.pdfIndicator}>
                      <Text style={{fontSize: 12, color: colors.success}}>📄</Text>
                      <Text style={styles.pdfText}>PDF Ready</Text>
                    </View>
                  )}
                </View>
                <View style={styles.recentActions}>
                  <Text style={{fontSize: 20, color: colors.primary}}>▶️</Text>
                  <Feather name="chevron-right" size={16} color={colors.textLight} />
                </View>
              </TouchableOpacity>
            ))
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  viewToggle: {
    padding: spacing.xs,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.grayLight,
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
  recentActions: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.xs,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
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
