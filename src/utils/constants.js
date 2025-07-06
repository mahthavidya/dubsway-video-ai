// App constants
export const APP_NAME = 'DubsWay Video AI';
export const VERSION = '1.0.0';

// API constants
export const API_BASE_URL = 'https://your-api-url.com/api';
export const API_TIMEOUT = 30000;

// Storage keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'userToken',
  USER_DATA: 'userData',
  APP_SETTINGS: 'appSettings',
};

// Screen dimensions
export const SCREEN_PADDING = 20;
export const HEADER_HEIGHT = 60;
export const BUTTON_HEIGHT = 48;

// Animation durations
export const ANIMATION_DURATION = {
  SHORT: 200,
  MEDIUM: 400,
  LONG: 600,
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Unauthorized access. Please login again.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  SIGNUP_SUCCESS: 'Account created successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
};

// Navigation route names
export const ROUTES = {
  // Auth routes
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  LOGOUT: 'Logout',
  
  // Main routes
  HOME: 'Home',
  PROFILE: 'Profile',
  HOME_SCREEN: 'HomeScreen',
};
