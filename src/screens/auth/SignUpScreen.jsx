import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TextInput
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../utils/colors';
import { authStyles } from '../../styles/authStyles';

const SignUpScreen = () => {
  const navigation = useNavigation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [secureEntry, setSecureEntry] = useState(true);
  const [confirmSecureEntry, setConfirmSecureEntry] = useState(true);
  const [focusedInput, setFocusedInput] = useState('');
  const [error, setError] = useState('');

  const handleChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.password.trim()) {
      setError('Password is required');
      return false;
    }
    if (!formData.confirmPassword.trim()) {
      setError('Please confirm your password');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await fetch('https://peace2024-dubswayvideoai.hf.space/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      // Check if signup was successful
      if (response.ok && result && result.hasOwnProperty("user_id")) {
        // Account created successfully - navigate to success screen
        navigation.navigate('SignupSuccess');
      } else {
        // Handle specific error messages
        let errorMessage = 'Sign up failed. Please try again.';
        
        if (result.detail === "Email already exists") {
          errorMessage = 'This email is already registered. Please use a different email or try logging in.';
        } else if (result.detail && result.detail.toLowerCase().includes('email')) {
          errorMessage = 'Invalid email address. Please check and try again.';
        } else if (result.detail && result.detail.toLowerCase().includes('password')) {
          errorMessage = 'Password does not meet requirements. Please try a stronger password.';
        } else if (result.message) {
          errorMessage = result.message;
        } else if (result.detail) {
          errorMessage = result.detail;
        } else if (!response.ok) {
          switch (response.status) {
            case 400:
              errorMessage = 'Invalid information provided. Please check your details.';
              break;
            case 409:
              errorMessage = 'An account with this email already exists.';
              break;
            case 500:
              errorMessage = 'Server error. Please try again later.';
              break;
            default:
              errorMessage = `Server error (${response.status}). Please try again later.`;
          }
        }
        
        setError(errorMessage);
      }
    } catch (error) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginNavigation = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView 
      style={authStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section */}
        <LinearGradient
          colors={[colors.secondary, colors.secondaryDark, colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={authStyles.headerContainer}
        >
          <View style={authStyles.logoContainer}>
            <View style={authStyles.logo}>
              <Text style={authStyles.logoText}>📚</Text>
            </View>
            <Text style={authStyles.appName}>DubsWay</Text>
            <Text style={authStyles.tagline}>Start your learning journey</Text>
          </View>
        </LinearGradient>

        {/* Content Section */}
        <View style={authStyles.contentContainer}>
          <View style={authStyles.welcomeContainer}>
            <Text style={authStyles.welcomeTitle}>Create Account</Text>
            <Text style={authStyles.welcomeSubtitle}>
              Join thousands of students transforming their learning
            </Text>
          </View>

          {/* Error Message */}
          {error ? (
            <View style={authStyles.errorContainer}>
              <Text style={authStyles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Form Section */}
          <View style={authStyles.formContainer}>
            {/* Name Input */}
            <View style={[
              authStyles.inputContainer,
              focusedInput === 'name' && authStyles.inputContainerFocused
            ]}>
              <Ionicons 
                name="person-outline" 
                size={20} 
                color={focusedInput === 'name' ? colors.primary : colors.textSecondary}
                style={authStyles.inputIcon}
              />
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter your full name"
                placeholderTextColor={colors.textLight}
                value={formData.name}
                onChangeText={text => handleChange('name', text)}
                autoCapitalize="words"
                autoCorrect={false}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput('')}
              />
            </View>

            {/* Email Input */}
            <View style={[
              authStyles.inputContainer,
              focusedInput === 'email' && authStyles.inputContainerFocused
            ]}>
              <Ionicons 
                name="mail-outline" 
                size={20} 
                color={focusedInput === 'email' ? colors.primary : colors.textSecondary}
                style={authStyles.inputIcon}
              />
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter your email"
                placeholderTextColor={colors.textLight}
                value={formData.email}
                onChangeText={text => handleChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput('')}
              />
            </View>

            {/* Password Input */}
            <View style={[
              authStyles.inputContainer,
              focusedInput === 'password' && authStyles.inputContainerFocused
            ]}>
              <Feather 
                name="lock" 
                size={20} 
                color={focusedInput === 'password' ? colors.primary : colors.textSecondary}
                style={authStyles.inputIcon}
              />
              <TextInput
                style={authStyles.textInput}
                placeholder="Create a password"
                placeholderTextColor={colors.textLight}
                value={formData.password}
                onChangeText={text => handleChange('password', text)}
                secureTextEntry={secureEntry}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput('')}
              />
              <TouchableOpacity
                style={authStyles.passwordToggle}
                onPress={() => setSecureEntry(!secureEntry)}
              >
                <Feather
                  name={secureEntry ? 'eye-off' : 'eye'}
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password Input */}
            <View style={[
              authStyles.inputContainer,
              focusedInput === 'confirmPassword' && authStyles.inputContainerFocused
            ]}>
              <Feather 
                name="lock" 
                size={20} 
                color={focusedInput === 'confirmPassword' ? colors.primary : colors.textSecondary}
                style={authStyles.inputIcon}
              />
              <TextInput
                style={authStyles.textInput}
                placeholder="Confirm your password"
                placeholderTextColor={colors.textLight}
                value={formData.confirmPassword}
                onChangeText={text => handleChange('confirmPassword', text)}
                secureTextEntry={confirmSecureEntry}
                onFocus={() => setFocusedInput('confirmPassword')}
                onBlur={() => setFocusedInput('')}
              />
              <TouchableOpacity
                style={authStyles.passwordToggle}
                onPress={() => setConfirmSecureEntry(!confirmSecureEntry)}
              >
                <Feather
                  name={confirmSecureEntry ? 'eye-off' : 'eye'}
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {/* Sign Up Button */}
            <View style={authStyles.buttonContainer}>
              <TouchableOpacity
                onPress={handleSignUp}
                disabled={loading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[colors.secondary, colors.secondaryDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={authStyles.primaryButton}
                >
                  {loading ? (
                    <ActivityIndicator color={colors.white} />
                  ) : (
                    <Text style={authStyles.primaryButtonText}>Create Account</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer Section */}
          <View style={authStyles.footerContainer}>
            <Text style={authStyles.footerText}>
              Already have an account?{' '}
              <Text style={authStyles.footerLink} onPress={handleLoginNavigation}>
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
