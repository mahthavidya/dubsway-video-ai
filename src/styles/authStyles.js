import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../utils/colors';
import { typography, spacing, borderRadius, shadows } from '../utils/designSystem';

const { width, height } = Dimensions.get('window');

export const authStyles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Header section
  headerContainer: {
    flex: 0.3, // Reduced from 0.4 to balance with content
    backgroundColor: colors.primary,
    borderBottomLeftRadius: borderRadius['3xl'],
    borderBottomRightRadius: borderRadius['3xl'],
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    ...shadows.lg,
  },
  
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  
  logo: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.md,
  },
  
  logoText: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  
  appName: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  
  tagline: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.9,
    paddingHorizontal: spacing.lg,
  },
  
  // Content section
  contentContainer: {
    flex: 0.7, // Increased from 0.6 to give more space
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  
  welcomeTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  
  welcomeSubtitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
  },
  
  // Form section
  formContainer: {
    // Removed flex: 1 to prevent absolute positioning
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  
  inputContainerFocused: {
    borderColor: colors.primary,
    ...shadows.md,
  },
  
  inputIcon: {
    marginRight: spacing.sm,
  },
  
  textInput: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    color: colors.text,
    paddingVertical: spacing.sm,
  },
  
  passwordToggle: {
    padding: spacing.sm,
  },
  
  // Button section
  buttonContainer: {
    marginTop: spacing.lg,
  },
  
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    ...shadows.md,
  },
  
  primaryButtonText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.white,
  },
  
  secondaryButton: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  
  secondaryButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary,
  },
  
  // Footer section
  footerContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingBottom: spacing.xl,
    marginTop: spacing.md, // Reduced from spacing.lg to spacing.md (16px)
  },
  
  footerText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  
  footerLink: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.primary,
  },
  
  // Loading state
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  
  loadingContent: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.xl,
  },
  
  loadingText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
    marginTop: spacing.md,
  },
  
  // Error state
  errorContainer: {
    backgroundColor: colors.error,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  
  errorText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.white,
    textAlign: 'center',
  },
  
  // Success state
  successContainer: {
    backgroundColor: colors.success,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  
  successText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.white,
    textAlign: 'center',
  },
  
  // Divider
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  
  dividerText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    color: colors.textSecondary,
    marginHorizontal: spacing.md,
  },
  
  // Social login buttons
  socialButtonsContainer: {
    marginTop: spacing.md,
  },
  
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  
  socialButtonIcon: {
    marginRight: spacing.sm,
  },
  
  socialButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
  },
});
