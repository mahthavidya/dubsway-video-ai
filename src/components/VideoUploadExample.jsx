// Video Upload Component
// Complete implementation for uploading videos to the API

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  ScrollView,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import ApiService from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { colors } from '../utils/colors';
import { spacing } from '../utils/designSystem';
import Ionicons from 'react-native-vector-icons/Ionicons';

const VideoUploadExample = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { user, token } = useAuth();
  
  // Temporary mock user for testing if real user data is not available
  const effectiveUser = user || (token ? { id: 11, email: 'test@example.com' } : null);
  
  const selectAndUploadVideo = async () => {
    if (!effectiveUser) {
      Alert.alert('Error', 'Please login to upload videos');
      return;
    }

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        await uploadVideo(asset.uri, asset.name || 'video.mp4', asset.size);
      } else {
        // Video selection cancelled
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select video. Please try again.');
    }
  };

  const uploadVideo = async (fileUri, fileName, fileSize = null) => {
    setUploading(true);
    setUploadProgress(0);

    try {
      // Additional data you might want to send
      const additionalData = {
        description: 'Video uploaded from mobile app',
        category: 'user_content',
        timestamp: new Date().toISOString(),
      };

      // Add file size if available
      if (fileSize) {
        additionalData.file_size = fileSize;
      }

      const result = await ApiService.uploadVideoFile(fileUri, fileName, additionalData);
      
      Alert.alert(
        'Success', 
        'Video uploaded successfully! You can check the processing status in your recent uploads.',
        [
          {
            text: 'OK',
            onPress: () => {
              // You can add navigation or refresh logic here
            }
          }
        ]
      );

    } catch (error) {
      
      Alert.alert(
        'Upload Failed', 
        error.message || 'Failed to upload video. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Ionicons name="videocam" size={60} color={colors.primary} />
          <Text style={styles.title}>Upload Video</Text>
          <Text style={styles.subtitle}>
            Select a video file from your device to upload
          </Text>
        </View>
        
        {effectiveUser && (
          <View style={styles.userCard}>
            <Ionicons name="person-circle" size={24} color={colors.primary} />
            <View style={styles.userInfo}>
              <Text style={styles.userEmail}>{effectiveUser.email}</Text>
              <Text style={styles.userId}>User ID: {effectiveUser.id}</Text>
            </View>
          </View>
        )}

        <View style={styles.uploadSection}>
          <TouchableOpacity
            style={[styles.uploadButton, uploading && styles.buttonDisabled]}
            onPress={selectAndUploadVideo}
            disabled={uploading || !effectiveUser}
          >
            {uploading ? (
              <View style={styles.uploadingContent}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.buttonText}>Uploading...</Text>
              </View>
            ) : (
              <View style={styles.buttonContent}>
                <Ionicons name="cloud-upload" size={20} color="#fff" />
                <Text style={styles.buttonText}>Select & Upload Video</Text>
              </View>
            )}
          </TouchableOpacity>

          {uploading && (
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                📤 Uploading video with user ID: {effectiveUser?.id}
              </Text>
              <Text style={styles.progressSubtext}>
                Please wait while we process your video...
              </Text>
            </View>
          )}

          {!effectiveUser && (
            <View style={styles.loginPrompt}>
              <Ionicons name="warning" size={24} color="#ff4444" />
              <Text style={styles.loginPromptText}>
                Please login to upload videos
              </Text>
            </View>
          )}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Upload Information</Text>
          <View style={styles.infoItem}>
            <Ionicons name="checkmark-circle" size={16} color={colors.accent} />
            <Text style={styles.infoText}>Videos will be uploaded to your account</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="checkmark-circle" size={16} color={colors.accent} />
            <Text style={styles.infoText}>Supported formats: MP4, MOV, AVI</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="checkmark-circle" size={16} color={colors.accent} />
            <Text style={styles.infoText}>Maximum file size: 100MB</Text>
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
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '10',
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.primary + '20',
  },
  userInfo: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  userEmail: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  userId: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  uploadSection: {
    marginBottom: spacing.xl,
  },
  uploadButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: colors.textSecondary,
    shadowOpacity: 0.1,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  progressContainer: {
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.accent + '10',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.accent + '20',
  },
  progressText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  progressSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  loginPrompt: {
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: '#ffebee',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  loginPromptText: {
    fontSize: 16,
    color: '#ff4444',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  infoSection: {
    marginTop: spacing.lg,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
    flex: 1,
  },
});

export default VideoUploadExample;

// Example of how to use the API service directly in any component:
/*
import ApiService from '../services/api';

const handleVideoUpload = async (fileUri, fileName) => {
  try {
    // The API service will automatically:
    // 1. Get user data from local storage
    // 2. Include user_id in the form data
    // 3. Add Authorization header with the token
    // 4. Upload to: https://peace2024-dubswayvideoai.hf.space/api/upload
    
    const result = await ApiService.uploadVideoFile(fileUri, fileName, {
      description: 'My video description',
      category: 'tutorial'
    });
    
    return result;
  } catch (error) {
    throw error;
  }
};
*/
