import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../utils/colors';
import { typography, spacing, borderRadius, shadows } from '../utils/designSystem';

const { width, height } = Dimensions.get('window');

export const homeStyles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Header section with gradient
  headerContainer: {
    flex: 0.45,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: borderRadius['3xl'],
    borderBottomRightRadius: borderRadius['3xl'],
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    ...shadows.lg,
  },
  
  // Logo and branding
  brandingContainer: {
    alignItems: 'center',
    paddingTop: spacing.xl,
  },
  
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadows.xl,
  },
  
  logoIcon: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  
  appTitle: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  
  appSubtitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.normal,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.9,
    paddingHorizontal: spacing.lg,
    lineHeight: typography.fontSize.lg * typography.lineHeight.relaxed,
  },
  
  // Content section
  contentContainer: {
    flex: 0.55,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    justifyContent: 'space-between',
  },
  
  // Welcome section
  welcomeSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  
  welcomeTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  
  welcomeDescription: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
    paddingHorizontal: spacing.sm,
  },
  
  // Features section
  featuresContainer: {
    marginBottom: spacing.xl,
  },
  
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  
  featureContent: {
    flex: 1,
  },
  
  featureTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  
  featureDescription: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    color: colors.textSecondary,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  
  // Button section
  buttonContainer: {
    paddingBottom: spacing.xl,
  },
  
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    ...shadows.lg,
  },
  
  primaryButtonText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
  },
  
  secondaryButton: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.primary,
    ...shadows.sm,
  },
  
  secondaryButtonText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.primary,
  },
  
  // Alternative layout - side by side buttons
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  
  buttonRowItem: {
    flex: 1,
  },
  
  // Status bar
  statusBarContainer: {
    height: 44, // Standard status bar height
    backgroundColor: colors.primary,
  },
  
  // Floating action elements
  floatingContainer: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.lg,
    zIndex: 100,
  },
  
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.full,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.xl,
  },
  
  // Decorative elements
  decorativeCircle: {
    position: 'absolute',
    backgroundColor: colors.white,
    opacity: 0.1,
    borderRadius: borderRadius.full,
  },
  
  decorativeCircleLarge: {
    width: 200,
    height: 200,
    top: -50,
    right: -50,
  },
  
  decorativeCircleSmall: {
    width: 100,
    height: 100,
    bottom: 50,
    left: -30,
  },
  
  // Animation and interaction states
  buttonPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
  
  // Responsive design adjustments
  containerSmall: {
    paddingHorizontal: spacing.md,
  },
  
  headerContainerSmall: {
    flex: 0.4,
  },
  
  contentContainerSmall: {
    flex: 0.6,
    paddingHorizontal: spacing.md,
  },
  
  // Dark mode support (for future implementation)
  containerDark: {
    backgroundColor: colors.black,
  },
  
  headerContainerDark: {
    backgroundColor: colors.grayDark,
  },
});
