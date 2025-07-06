// Example usage functions for file uploads with user data
// Updated to use the correct API endpoint: https://peace2024-dubswayvideoai.hf.space/api/upload

import ApiService from '../services/api';
import Storage from '../utils/storage';

/**
 * Example function to upload a video file with user data
 * @param {string} fileUri - The URI of the video file
 * @param {string} fileName - The name of the file
 * @param {object} additionalData - Any additional data to send with the upload
 * @returns {Promise} Upload response
 */
export const uploadVideoWithUserData = async (fileUri, fileName, additionalData = {}) => {
  try {
    // The ApiService.uploadVideoFile method already handles getting user data
    const result = await ApiService.uploadVideoFile(fileUri, fileName, additionalData);
    
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Example function to upload an audio file with user data
 * @param {string} fileUri - The URI of the audio file
 * @param {string} fileName - The name of the file
 * @param {object} additionalData - Any additional data to send with the upload
 * @returns {Promise} Upload response
 */
export const uploadAudioWithUserData = async (fileUri, fileName, additionalData = {}) => {
  try {
    // The ApiService.uploadAudioFile method already handles getting user data
    const result = await ApiService.uploadAudioFile(fileUri, fileName, additionalData);
    
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Get current user data for manual use
 * @returns {Promise<object|null>} User data object or null if not authenticated
 */
export const getCurrentUserData = async () => {
  try {
    const userDataWithToken = await Storage.getUserDataWithToken();
    
    if (userDataWithToken && userDataWithToken.user) {
      return userDataWithToken.user;
    }
    
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Get user ID for API calls
 * @returns {Promise<number|null>} User ID or null if not authenticated
 */
export const getCurrentUserId = async () => {
  try {
    return await Storage.getUserId();
  } catch (error) {
    return null;
  }
};

// Example usage in a component:
/*
import { uploadVideoWithUserData, uploadAudioWithUserData, getCurrentUserData } from '../utils/uploadHelpers';

const MyComponent = () => {
  const handleVideoUpload = async (fileUri, fileName) => {
    try {
      // This will upload to: https://peace2024-dubswayvideoai.hf.space/api/upload
      // With user_id automatically included from local storage
      const result = await uploadVideoWithUserData(fileUri, fileName, {
        description: 'My video description',
        category: 'tutorial'
      });
      
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  const handleAudioUpload = async (fileUri, fileName) => {
    try {
      // This will upload to: https://peace2024-dubswayvideoai.hf.space/api/upload
      // With user_id automatically included from local storage
      const result = await uploadAudioWithUserData(fileUri, fileName, {
        description: 'My audio description',
        category: 'podcast'
      });
      
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  const getUserInfo = async () => {
    const userData = await getCurrentUserData();
    // userData will be: { id: 11, email: "a@gmail.com" }
  };

  return (
    // Your component JSX
  );
};
*/
