import { Platform } from 'react-native';

/**
 * Minimal Dark Design System
 * 
 * Philosophy:
 * - Pure blacks, not tinted
 * - Single accent color
 * - Maximum contrast
 * - Generous space
 * - Confident typography
 */

const palette = {
  // Pure blacks
  black: '#000000',
  dark: '#0A0A0A',
  elevated: '#111111',
  card: '#161616',
  
  // Grays - minimal steps
  gray: '#666666',
  muted: '#999999',
  subtle: '#1A1A1A',
  
  // Single accent - vibrant green
  accent: '#00FF88',
  accentMuted: 'rgba(0, 255, 136, 0.15)',
  
  // Text
  white: '#FFFFFF',
  textPrimary: '#FFFFFF',
  textSecondary: '#999999',
  textTertiary: '#666666',
  
  // Borders - barely visible
  border: 'rgba(255, 255, 255, 0.08)',
  borderStrong: 'rgba(255, 255, 255, 0.15)',
  
  // States
  error: '#FF4444',
  success: '#00FF88',
  warning: '#FFAA00',
  info: '#4DA6FF',
  
  // Legacy aliases for backwards compatibility
  background: '#000000',
  surface: '#161616',
  surfaceContainer: '#161616',
  surfaceContainerHigh: '#111111',
  primary: '#00FF88',
  onPrimary: '#000000',
  onSurface: '#FFFFFF',
  onSurfaceVariant: '#999999',
  onSecondaryContainer: '#999999',
  secondaryContainer: '#1A1A1A',
  tertiary: '#4DA6FF',
  tertiaryContainer: '#1A2A3A',
  onTertiaryContainer: '#AADDFF',
  mutedStrong: '#444444',
  outline: 'rgba(255, 255, 255, 0.08)',
  outlineVariant: 'rgba(255, 255, 255, 0.15)',
  scrim: 'rgba(0, 0, 0, 0.6)',
};

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

// Generous spacing - let things breathe
export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Soft, modern radii
export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
  pill: 9999, // Legacy alias
};

// Bold, confident typography
export const typography = {
  // Display - for hero numbers
  hero: { fontFamily, fontSize: 56, lineHeight: 64, fontWeight: '700' as const, letterSpacing: -2 },
  display: { fontFamily, fontSize: 40, lineHeight: 48, fontWeight: '700' as const, letterSpacing: -1.5 },
  
  // Headings
  h1: { fontFamily, fontSize: 32, lineHeight: 40, fontWeight: '600' as const, letterSpacing: -0.5 },
  h2: { fontFamily, fontSize: 24, lineHeight: 32, fontWeight: '600' as const, letterSpacing: -0.3 },
  h3: { fontFamily, fontSize: 20, lineHeight: 28, fontWeight: '600' as const, letterSpacing: 0 },
  
  // Body
  body: { fontFamily, fontSize: 16, lineHeight: 24, fontWeight: '400' as const, letterSpacing: 0 },
  bodySmall: { fontFamily, fontSize: 14, lineHeight: 20, fontWeight: '400' as const, letterSpacing: 0 },
  
  // Labels
  label: { fontFamily, fontSize: 13, lineHeight: 16, fontWeight: '500' as const, letterSpacing: 0.5 },
  labelSmall: { fontFamily, fontSize: 11, lineHeight: 14, fontWeight: '500' as const, letterSpacing: 0.5 },
  
  // Mono for numbers
  mono: { fontFamily: Platform.select({ ios: 'SF Mono', android: 'monospace', default: 'monospace' }), fontSize: 14, lineHeight: 20, fontWeight: '500' as const },
  
  // Legacy aliases for backwards compatibility
  displayLarge: { fontFamily, fontSize: 56, lineHeight: 64, fontWeight: '700' as const, letterSpacing: -2 },
  displayMedium: { fontFamily, fontSize: 40, lineHeight: 48, fontWeight: '700' as const, letterSpacing: -1.5 },
  displaySmall: { fontFamily, fontSize: 32, lineHeight: 40, fontWeight: '600' as const, letterSpacing: -0.5 },
  headlineLarge: { fontFamily, fontSize: 32, lineHeight: 40, fontWeight: '600' as const, letterSpacing: -0.5 },
  headlineMedium: { fontFamily, fontSize: 24, lineHeight: 32, fontWeight: '600' as const, letterSpacing: -0.3 },
  headlineSmall: { fontFamily, fontSize: 20, lineHeight: 28, fontWeight: '600' as const, letterSpacing: 0 },
  titleLarge: { fontFamily, fontSize: 20, lineHeight: 28, fontWeight: '600' as const, letterSpacing: 0 },
  titleMedium: { fontFamily, fontSize: 16, lineHeight: 24, fontWeight: '600' as const, letterSpacing: 0 },
  titleSmall: { fontFamily, fontSize: 14, lineHeight: 20, fontWeight: '600' as const, letterSpacing: 0 },
  bodyLarge: { fontFamily, fontSize: 16, lineHeight: 24, fontWeight: '400' as const, letterSpacing: 0 },
  bodyMedium: { fontFamily, fontSize: 14, lineHeight: 20, fontWeight: '400' as const, letterSpacing: 0 },
  labelLarge: { fontFamily, fontSize: 14, lineHeight: 20, fontWeight: '500' as const, letterSpacing: 0.5 },
  labelMedium: { fontFamily, fontSize: 13, lineHeight: 16, fontWeight: '500' as const, letterSpacing: 0.5 },
};

// Quick animations
export const motion = {
  fast: 150,
  normal: 250,
  slow: 400,
  spring: { damping: 20, stiffness: 300 },
  duration: { fast: 150, normal: 250, slow: 400 },
  pressScale: 0.97,
};

// Elevation (minimal - we use flat design)
export const elevation = {
  level0: {},
  level1: {},
  level2: {},
  level3: {},
  level4: {},
  level5: {},
};

// Opacity
export const opacity = {
  disabled: 0.4,
  hover: 0.08,
  focus: 0.12,
  pressed: 0.14,
};

export const tokens = {
  color: palette,
  spacing,
  radius,
  typography,
  motion,
  elevation,
  opacity,
};

export type Tokens = typeof tokens;
