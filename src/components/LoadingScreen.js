import React from 'react';
import { 
  View, 
  Text, 
  ActivityIndicator,
  StyleSheet 
} from 'react-native';
import { colors } from '../utils/colors';
import { spacing, borderRadius } from '../utils/designSystem';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>📚</Text>
      </View>
      <Text style={styles.appName}>DubsWay</Text>
      <Text style={styles.tagline}>Transform your learning with AI</Text>
      <ActivityIndicator 
        size="large" 
        color={colors.white} 
        style={styles.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    fontSize: 48,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: spacing.sm,
  },
  tagline: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  loader: {
    marginTop: spacing.lg,
  },
});

export default LoadingScreen;
