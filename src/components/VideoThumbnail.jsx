import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/colors';
import { spacing, borderRadius } from '../utils/designSystem';

const { width: screenWidth } = Dimensions.get('window');
const thumbnailWidth = (screenWidth - spacing.lg * 3) / 2;

const VideoThumbnail = ({ 
  videoUrl, 
  pdfUrl, 
  title, 
  status, 
  createdAt, 
  onPlay,
  style 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  // Generate thumbnail URL from video URL (common video hosting services)
  const getThumbnailUrl = (videoUrl) => {
    if (!videoUrl) return null;
    
    // For S3 or direct video URLs, we'll use a placeholder
    // In production, you might want to generate actual thumbnails
    return null;
  };

  const thumbnailUrl = getThumbnailUrl(videoUrl);

  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={onPlay}
      activeOpacity={0.8}
    >
      {/* Thumbnail/Preview */}
      <View style={styles.thumbnailContainer}>
        {thumbnailUrl && !imageError ? (
          <Image
            source={{ uri: thumbnailUrl }}
            style={styles.thumbnail}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={styles.placeholderThumbnail}>
            <Ionicons name="videocam" size={32} color={colors.primary} />
          </View>
        )}
        
        {/* Play Button Overlay */}
        <View style={styles.playOverlay}>
          <View style={styles.playButton}>
            <Ionicons name="play" size={20} color={colors.white} />
          </View>
        </View>

        {/* Status Badge */}
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(status) }]}>
          <Ionicons 
            name={getStatusIcon(status)} 
            size={12} 
            color={colors.white} 
          />
        </View>

        {/* PDF Available Badge */}
        {pdfUrl && pdfUrl.trim() && pdfUrl !== '.' && (
          <View style={styles.pdfBadge}>
            <Ionicons name="document-text" size={12} color={colors.white} />
          </View>
        )}
      </View>

      {/* Video Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title || 'Untitled Video'}
        </Text>
        <View style={styles.metadataRow}>
          <Text style={styles.status}>
            {status && status.trim() && status.trim() !== '.' ? 
              status.charAt(0).toUpperCase() + status.slice(1) : 
              'Unknown'
            }
          </Text>
          <Text style={styles.metadataSeparator}>•</Text>
          <Text style={styles.date}>
            {(() => {
              try {
                if (!createdAt || createdAt.trim() === '' || createdAt.trim() === '.') {
                  return 'Unknown date';
                }
                const date = new Date(createdAt);
                return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString();
              } catch (error) {
                return 'Invalid date';
              }
            })()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: thumbnailWidth,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  thumbnailContainer: {
    position: 'relative',
    aspectRatio: 16 / 9,
    backgroundColor: colors.backgroundSecondary,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  placeholderThumbnail: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grayLight,
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 25,
    padding: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    borderRadius: 12,
    padding: spacing.xs,
    minWidth: 24,
    alignItems: 'center',
  },
  pdfBadge: {
    position: 'absolute',
    top: spacing.xs,
    left: spacing.xs,
    backgroundColor: colors.success,
    borderRadius: 12,
    padding: spacing.xs,
    minWidth: 24,
    alignItems: 'center',
  },
  infoContainer: {
    padding: spacing.sm,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
    lineHeight: 18,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  status: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  metadataSeparator: {
    fontSize: 12,
    color: colors.textLight,
    marginHorizontal: spacing.xs,
  },
  date: {
    fontSize: 11,
    color: colors.textLight,
  },
});

export default VideoThumbnail;
