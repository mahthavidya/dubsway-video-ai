import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../utils/storage';

const API_BASE_URL = 'https://peace2024-dubswayvideoai.hf.space';

class ApiService {
  async getToken() {
    try {
      return await Storage.getUserToken();
    } catch (error) {
      return null;
    }
  }

  async getUserData() {
    try {
      return await Storage.getUserData();
    } catch (error) {
      return null;
    }
  }

  async getUserDataWithToken() {
    try {
      const result = await Storage.getUserDataWithToken();
      return result;
    } catch (error) {
      return null;
    }
  }

  async request(endpoint, options = {}) {
    const token = await this.getToken();
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async signup(userData) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // User endpoints
  async getProfile() {
    return this.request('/user/profile');
  }

  async updateProfile(userData) {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // File upload methods
  async uploadVideoFile(fileUri, fileName, additionalData = {}) {
    try {
      const userDataWithToken = await this.getUserDataWithToken();
      
      if (!userDataWithToken || !userDataWithToken.user || !userDataWithToken.token) {
        throw new Error('User not authenticated');
      }

      const formData = new FormData();
      
      // Get file extension to determine proper MIME type
      const fileExtension = fileName.toLowerCase().split('.').pop();
      let mimeType = 'video/mp4'; // default
      
      if (fileExtension === 'mov') {
        mimeType = 'video/quicktime';
      } else if (fileExtension === 'avi') {
        mimeType = 'video/x-msvideo';
      } else if (fileExtension === 'mkv') {
        mimeType = 'video/x-matroska';
      } else if (fileExtension === 'webm') {
        mimeType = 'video/webm';
      }
      
      // Add the video file with proper structure for React Native
      const fileObject = {
        uri: fileUri,
        type: mimeType,
        name: fileName,
      };
      
      // Check if we're in a web environment and handle base64 data URLs
      if (fileUri.startsWith('data:')) {
        // Convert base64 data URL to Blob for web
        const response = await fetch(fileUri);
        const blob = await response.blob();
        
        formData.append('file', blob, fileName);
      } else {
        // For React Native environments
        formData.append('file', fileObject, fileName);
      }
      
      // Add user_id as required by the API
      formData.append('user_id', userDataWithToken.user.id.toString());
      
      // Add any additional data
      Object.keys(additionalData).forEach(key => {
        if (typeof additionalData[key] === 'object') {
          formData.append(key, JSON.stringify(additionalData[key]));
        } else {
          formData.append(key, additionalData[key].toString());
        }
      });

      const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userDataWithToken.token}`,
          // Don't set Content-Type header - let FormData set it automatically with boundary
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async uploadAudioFile(fileUri, fileName, additionalData = {}) {
    try {
      const userDataWithToken = await this.getUserDataWithToken();
      
      if (!userDataWithToken || !userDataWithToken.user || !userDataWithToken.token) {
        throw new Error('User not authenticated');
      }

      const formData = new FormData();
      
      // Get file extension to determine proper MIME type
      const fileExtension = fileName.toLowerCase().split('.').pop();
      let mimeType = 'audio/mp3'; // default
      
      if (fileExtension === 'wav') {
        mimeType = 'audio/wav';
      } else if (fileExtension === 'm4a') {
        mimeType = 'audio/mp4';
      } else if (fileExtension === 'aac') {
        mimeType = 'audio/aac';
      } else if (fileExtension === 'ogg') {
        mimeType = 'audio/ogg';
      }
      
      // Add the audio file with proper structure for React Native
      const fileObject = {
        uri: fileUri,
        type: mimeType,
        name: fileName,
      };
      
      // Check if we're in a web environment and handle base64 data URLs
      if (fileUri.startsWith('data:')) {
        // Convert base64 data URL to Blob for web
        const response = await fetch(fileUri);
        const blob = await response.blob();
        
        formData.append('file', blob, fileName);
      } else {
        // For React Native environments
        formData.append('file', fileObject, fileName);
      }
      
      // Add user_id as required by the API
      formData.append('user_id', userDataWithToken.user.id.toString());
      
      // Add any additional data
      Object.keys(additionalData).forEach(key => {
        if (typeof additionalData[key] === 'object') {
          formData.append(key, JSON.stringify(additionalData[key]));
        } else {
          formData.append(key, additionalData[key].toString());
        }
      });

      const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userDataWithToken.token}`,
          // Don't set Content-Type header - let FormData set it automatically with boundary
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
      throw error;
    }
  }

  // Dashboard endpoints
  async getDashboard(userId) {
    return this.request(`/api/dashboard/${userId}`);
  }

  async getUserDashboard() {
    try {
      const userDataWithToken = await this.getUserDataWithToken();
      
      if (!userDataWithToken || !userDataWithToken.user || !userDataWithToken.token) {
        throw new Error('User not authenticated');
      }

      // Use the actual user ID from authentication
      return this.request(`/api/dashboard/${userDataWithToken.user.id}`);
    } catch (error) {
      throw error;
    }
  }
}

export default new ApiService();
