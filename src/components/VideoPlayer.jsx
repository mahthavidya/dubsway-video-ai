import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { Video } from 'expo-av';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/colors';
import { spacing, borderRadius } from '../utils/designSystem';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const VideoPlayer = ({ videoUrl, pdfUrl, title, onClose, visible }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [status, setStatus] = useState({});
  const [videoError, setVideoError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  // Reset states when modal opens/closes
  useEffect(() => {
    if (visible) {
      setIsPlaying(false);
      setIsLoading(true);
      setVideoError(null);
      setStatus({});
    }
  }, [visible]);

  const togglePlayPause = async () => {
    if (videoRef.current) {
      try {
        if (isPlaying) {
          await videoRef.current.pauseAsync();
        } else {
          await videoRef.current.playAsync();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        Alert.alert('Error', 'Failed to control video playback');
      }
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    setStatus(status);
    setIsPlaying(status.isPlaying || false);
    
    if (status.isLoaded) {
      setIsLoading(false);
    }
    
    if (status.error) {
      setVideoError(status.error);
      setIsLoading(false);
    }
    
    if (status.didJustFinish) {
      setIsPlaying(false);
    }
  };

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownloadPDF = async () => {
    if (!pdfUrl) {
      Alert.alert('Info', 'PDF is not ready yet. Please check back later.');
      return;
    }

    try {
      if (Platform.OS === 'web') {
        // For web, open in new tab
        window.open(pdfUrl, '_blank');
      } else {
        // For mobile, open with system app
        const supported = await Linking.canOpenURL(pdfUrl);
        if (supported) {
          await Linking.openURL(pdfUrl);
        } else {
          Alert.alert('Error', 'Cannot open PDF. Please try again later.');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open PDF: ' + error.message);
    }
  };

  const handleShareVideo = async () => {
    if (Platform.OS === 'web') {
      // For web, copy to clipboard
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(videoUrl);
        Alert.alert('Success', 'Video URL copied to clipboard!');
      } else {
        Alert.alert('Info', 'Video URL: ' + videoUrl);
      }
    } else {
      // For mobile, we could use Share API here
      Alert.alert('Share Video', 'Video URL: ' + videoUrl);
    }
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <TouchableOpacity onPress={handleShareVideo} style={styles.shareButton}>
            <Ionicons name="share" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Video Player */}
        <View style={styles.videoContainer}>
          {videoError ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={48} color={colors.error} />
              <Text style={styles.errorText}>Failed to load video</Text>
              <Text style={styles.errorSubtext}>Please check your internet connection</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={() => {
                  setVideoError(null);
                  setIsLoading(true);
                  if (videoRef.current) {
                    videoRef.current.replayAsync();
                  }
                }}
              >
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Video
                ref={videoRef}
                style={styles.video}
                source={{ uri: videoUrl }}
                useNativeControls={false}
                resizeMode="contain"
                isLooping={false}
                onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                shouldPlay={false}
              />
              
              {isLoading && (
                <View style={styles.loadingContainer}>
                  <Text style={styles.loadingText}>Loading video...</Text>
                </View>
              )}
              
              {/* Custom Controls */}
              {!isLoading && (
                <View style={styles.controlsContainer}>
                  <TouchableOpacity
                    style={styles.playButton}
                    onPress={togglePlayPause}
                  >
                    <Ionicons
                      name={isPlaying ? 'pause' : 'play'}
                      size={48}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}

          {/* Progress Bar */}
          {status.durationMillis && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${(status.positionMillis / status.durationMillis) * 100}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.timeText}>
                {formatTime(status.positionMillis || 0)} / {formatTime(status.durationMillis)}
              </Text>
            </View>
          )}
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: pdfUrl ? colors.success : colors.gray },
            ]}
            onPress={handleDownloadPDF}
            disabled={!pdfUrl}
          >
            <Ionicons
              name="document-text"
              size={20}
              color={colors.white}
            />
            <Text style={styles.actionButtonText}>
              {pdfUrl ? 'Download PDF' : 'PDF Processing...'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={handleShareVideo}
          >
            <Ionicons name="share" size={20} color={colors.white} />
            <Text style={styles.actionButtonText}>Share Video</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === 'ios' ? 50 : spacing.md,
  },
  closeButton: {
    padding: spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginHorizontal: spacing.md,
    textAlign: 'center',
  },
  shareButton: {
    padding: spacing.sm,
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  video: {
    width: screenWidth,
    height: screenHeight * 0.6,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  errorText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    marginTop: spacing.md,
    textAlign: 'center',
  },
  errorSubtext: {
    color: colors.textLight,
    fontSize: 14,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    marginTop: spacing.lg,
  },
  retryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  controlsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 50,
    padding: spacing.lg,
  },
  progressContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginRight: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  timeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
    minWidth: 80,
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: spacing.lg,
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default VideoPlayer;
