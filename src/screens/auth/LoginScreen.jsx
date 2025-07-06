import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../../utils/colors';
import { useAuth } from '../../context/AuthContext';
import { authStyles } from '../../styles/authStyles';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [secureEntry, setSecureEntry] = useState(true);
  const [focusedInput, setFocusedInput] = useState('');
  const [error, setError] = useState('');

  const handleChange = (key, value) => {
    setLoginData(prev => ({
      ...prev,
      [key]: value,
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!loginData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!loginData.password.trim()) {
      setError('Password is required');
      return false;
    }
    if (!loginData.email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    const data = {
      email: loginData.email,
      password: loginData.password
    };

    try {
      const response = await fetch('https://peace2024-dubswayvideoai.hf.space/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (response.ok && result && result.access_token) {
        await login(result.access_token, result.user);
        
        // Small delay to ensure token is set properly
        setTimeout(() => {
          // Removed success alert - user will be redirected automatically
        }, 100);
      } else {
        setError(result.message || result.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpNavigation = () => {
    navigation.navigate('Signup');
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
        <View style={authStyles.headerContainer}>
          <View style={authStyles.logoContainer}>
            <View style={authStyles.logo}>
              <Text style={authStyles.logoText}>📚</Text>
            </View>
            <Text style={authStyles.appName}>DubsWay</Text>
            <Text style={authStyles.tagline}>Transform your learning with AI</Text>
          </View>
        </View>

        {/* Content Section */}
        <View style={authStyles.contentContainer}>
          <View style={authStyles.welcomeContainer}>
            <Text style={authStyles.welcomeTitle}>Welcome Back</Text>
            <Text style={authStyles.welcomeSubtitle}>
              Sign in to continue your learning journey
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
                value={loginData.email}
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
                placeholder="Enter your password"
                placeholderTextColor={colors.textLight}
                value={loginData.password}
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

            {/* Login Button */}
            <View style={authStyles.buttonContainer}>
              <TouchableOpacity
                style={authStyles.primaryButton}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text style={authStyles.primaryButtonText}>Sign In</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer Section */}
          <View style={authStyles.footerContainer}>
            <Text style={authStyles.footerText}>
              Don't have an account?{' '}
              <Text style={authStyles.footerLink} onPress={handleSignUpNavigation}>
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
