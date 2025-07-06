import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  StatusBar,
  SafeAreaView 
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../../utils/colors';
import { homeStyles } from '../../styles/homeStyles';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleSignUp = () => {
    navigation.navigate("Signup");
  };

  const features = [
    {
      icon: 'videocam',
      title: 'Video to PDF',
      description: 'Convert your video lectures into searchable PDFs'
    },
    {
      icon: 'mic',
      title: 'Audio to PDF',
      description: 'Transform audio recordings into organized documents'
    },
    {
      icon: 'document-text',
      title: 'Smart Transcription',
      description: 'AI-powered transcription with high accuracy'
    },
    {
      icon: 'search',
      title: 'Searchable Content',
      description: 'Find any information instantly in your documents'
    }
  ];

  return (
    <SafeAreaView style={homeStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      <ScrollView 
        style={homeStyles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header Section */}
        <View style={homeStyles.headerContainer}>
          {/* Decorative Elements */}
          <View style={[homeStyles.decorativeCircle, homeStyles.decorativeCircleLarge]} />
          <View style={[homeStyles.decorativeCircle, homeStyles.decorativeCircleSmall]} />
          
          <View style={homeStyles.brandingContainer}>
            <View style={homeStyles.logoContainer}>
              <Text style={homeStyles.logoIcon}>📚</Text>
            </View>
            <Text style={homeStyles.appTitle}>DubsWay</Text>
            <Text style={homeStyles.appSubtitle}>
              Transform your learning materials into searchable PDFs with AI
            </Text>
          </View>
        </View>

        {/* Content Section */}
        <View style={homeStyles.contentContainer}>
          {/* Welcome Section */}
          <View style={homeStyles.welcomeSection}>
            <Text style={homeStyles.welcomeTitle}>Welcome to the Future of Learning</Text>
            <Text style={homeStyles.welcomeDescription}>
              Convert your video lectures and audio recordings into organized, searchable PDF documents. 
              Perfect for students who want to study more efficiently.
            </Text>
          </View>

          {/* Features Section */}
          <View style={homeStyles.featuresContainer}>
            {features.map((feature, index) => (
              <View key={index} style={homeStyles.featureItem}>
                <View style={homeStyles.featureIcon}>
                  <Ionicons name={feature.icon} size={20} color={colors.white} />
                </View>
                <View style={homeStyles.featureContent}>
                  <Text style={homeStyles.featureTitle}>{feature.title}</Text>
                  <Text style={homeStyles.featureDescription}>{feature.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={homeStyles.buttonContainer}>
            <TouchableOpacity
              style={homeStyles.primaryButton}
              onPress={handleSignUp}
              activeOpacity={0.8}
            >
              <Text style={homeStyles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={homeStyles.secondaryButton}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={homeStyles.secondaryButtonText}>I Already Have an Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
