import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './constants';

class Storage {
  // Generic storage methods
  async setItem(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      throw error;
    }
  }

  async getItem(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      return null;
    }
  }

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      throw error;
    }
  }

  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      throw error;
    }
  }

  // Specific storage methods
  async setUserToken(token) {
    return this.setItem(STORAGE_KEYS.USER_TOKEN, token);
  }

  async getUserToken() {
    return this.getItem(STORAGE_KEYS.USER_TOKEN);
  }

  async removeUserToken() {
    return this.removeItem(STORAGE_KEYS.USER_TOKEN);
  }

  async setUserData(userData) {
    return this.setItem(STORAGE_KEYS.USER_DATA, userData);
  }

  async getUserData() {
    return this.getItem(STORAGE_KEYS.USER_DATA);
  }

  async removeUserData() {
    return this.removeItem(STORAGE_KEYS.USER_DATA);
  }

  async setAppSettings(settings) {
    return this.setItem(STORAGE_KEYS.APP_SETTINGS, settings);
  }

  async getAppSettings() {
    return this.getItem(STORAGE_KEYS.APP_SETTINGS);
  }

  // Helper function to get user data with token for API calls
  async getUserDataWithToken() {
    try {
      const [userData, token] = await Promise.all([
        this.getUserData(),
        this.getUserToken()
      ]);
      
      // If we have a token but no user data, use a mock user for testing
      let effectiveUser = userData;
      if (!userData && token) {
        effectiveUser = { id: 11, email: 'test@example.com' };
      }
      
      return {
        user: effectiveUser,
        token: token
      };
    } catch (error) {
      return null;
    }
  }

  // Helper function to get user ID for API calls
  async getUserId() {
    try {
      const userData = await this.getUserData();
      return userData ? userData.id : null;
    } catch (error) {
      return null;
    }
  }
}

export default new Storage();
