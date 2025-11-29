// 9xf labs Mobile Design System
// Inspired by: Dark theme with pastel accent cards
// Unique, premium fintech aesthetic

import { Platform } from 'react-native';

// =============================================================================
// COLOR SYSTEM - Dark with Pastel Accents
// =============================================================================
export const colors = {
  // Backgrounds - True black for OLED
  background: '#000000',
  surface: '#0A0A0A',
  surfaceElevated: '#141414',
  surfaceCard: '#1A1A1A',
  
  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  textTertiary: '#6B6B6B',
  textMuted: '#404040',
  
  // Pastel card colors (inspired by the design)
  cardCream: '#F5E6D3',
  cardMint: '#C8F7DC', 
  cardCyan: '#7DD3FC',
  cardPeach: '#FECACA',
  cardLavender: '#DDD6FE',
  
  // Text on pastel cards
  onCardCream: '#78350F',
  onCardMint: '#14532D',
  onCardCyan: '#0C4A6E',
  onCardPeach: '#7F1D1D',
  onCardLavender: '#4C1D95',
  
  // Primary accent
  primary: '#FFFFFF',
  primaryMuted: 'rgba(255, 255, 255, 0.1)',
  
  // Accent - Gradient-inspired
  accent: '#C8F7DC',
  accentSecondary: '#7DD3FC',
  
  // Status
  success: '#C8F7DC',
  error: '#FECACA',
  warning: '#FDE68A',
  
  // Borders
  border: '#262626',
  borderLight: '#1F1F1F',
  
  // Legacy aliases for compatibility
  onSurface: '#FFFFFF',
  onSurfaceVariant: '#A0A0A0',
  surfaceSecondary: '#141414',
  surfaceContainerHighest: '#262626',
  surfaceContainer: '#1A1A1A',
  surfaceContainerLow: '#141414',
  borderSubtle: '#262626',
  borderStrong: '#404040',
  link: '#7DD3FC',
  info: '#7DD3FC',
  textPlaceholder: '#6B6B6B',
  primaryContainer: '#262626',
  onPrimaryContainer: '#FFFFFF',
  secondaryContainer: '#262626',
  onSecondaryContainer: '#FFFFFF',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.8)',
};

// =============================================================================
// MATERIAL DESIGN 3 TYPOGRAPHY
// https://m3.material.io/styles/typography/type-scale-tokens
// =============================================================================
export const typography = {
  // Display
  displayLarge: {
    fontSize: 57,
    lineHeight: 64,
    fontWeight: '400' as const,
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontSize: 45,
    lineHeight: 52,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  displaySmall: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  
  // Headline
  headlineLarge: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  headlineMedium: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  headlineSmall: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  
  // Title
  titleLarge: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  titleMedium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500' as const,
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
    letterSpacing: 0.1,
  },
  
  // Body
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
    letterSpacing: 0.4,
  },
  
  // Label
  labelLarge: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
  },
};

// =============================================================================
// SHAPE (Corner Radius) - More rounded, premium feel
// =============================================================================
export const shape = {
  none: 0,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  full: 9999,
  // Legacy aliases
  extraSmall: 8,
  small: 12,
  medium: 16,
  large: 20,
  extraLarge: 28,
};

// Alias for backward compatibility
export const radius = shape;
export const borderRadius = shape;

// =============================================================================
// MATERIAL DESIGN 3 SPACING
// Based on 4dp grid
// =============================================================================
export const spacing = {
  none: 0,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// =============================================================================
// MATERIAL DESIGN 3 ELEVATION (Shadows)
// https://m3.material.io/styles/elevation/overview
// =============================================================================
export const elevation = {
  level0: Platform.select({
    ios: {},
    android: { elevation: 0 },
  }),
  level1: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 3,
    },
    android: { elevation: 1 },
  }),
  level2: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    android: { elevation: 3 },
  }),
  level3: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: { elevation: 6 },
  }),
  level4: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
    },
    android: { elevation: 8 },
  }),
  level5: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
    },
    android: { elevation: 12 },
  }),
};

// Alias
export const shadows = elevation;

// =============================================================================
// MATERIAL DESIGN 3 STATE LAYERS
// https://m3.material.io/foundations/interaction/states/state-layers
// =============================================================================
export const stateLayer = {
  hover: 0.08,
  focus: 0.12,
  pressed: 0.12,
  dragged: 0.16,
};

// =============================================================================
// COMPONENT TOKENS - Inspired by premium fintech design
// =============================================================================
export const components = {
  // Button - pill shaped
  button: {
    height: 52,
    paddingHorizontal: 32,
    borderRadius: shape.full,
  },
  filledButton: {
    height: 52,
    paddingHorizontal: 32,
    borderRadius: shape.full,
  },
  outlinedButton: {
    height: 52,
    paddingHorizontal: 32,
    borderRadius: shape.full,
    borderWidth: 1,
  },
  textButton: {
    height: 48,
    paddingHorizontal: 16,
  },
  // Input field
  input: {
    height: 56,
    borderRadius: shape.md,
    paddingHorizontal: spacing.lg,
  },
  textField: {
    height: 56,
    borderRadius: shape.md,
    paddingHorizontal: spacing.lg,
  },
  // Card - very rounded
  card: {
    borderRadius: shape.xl,
    padding: spacing.lg,
  },
  // Pastel accent card
  accentCard: {
    borderRadius: shape.xl,
    padding: spacing.lg,
  },
  // Navigation Bar
  navigationBar: {
    height: 72,
  },
  // Tab bar
  tabBar: {
    height: 64,
  },
  // List Item
  listItem: {
    minHeight: 64,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: shape.lg,
  },
};

// =============================================================================
// LEGACY EXPORTS (backward compatibility)
// =============================================================================
export const fontSize = {
  xs: 11,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 22,
  xxl: 28,
  xxxl: 36,
  display: 57,
};

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export default {
  colors,
  typography,
  shape,
  spacing,
  elevation,
  stateLayer,
  components,
};
