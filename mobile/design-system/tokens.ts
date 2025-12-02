import { Platform } from 'react-native';

/**
 * Material Design 3 Dark Theme Color System
 * 
 * Based on official M3 guidelines:
 * - Tonal surface hierarchy for elevation
 * - Primary/Secondary/Tertiary color roles with on-colors
 * - Accessible contrast ratios (4.5:1 minimum for text)
 * - Surface container hierarchy: lowest → low → container → high → highest
 */
const m3Dark = {
  // Primary - Main brand color (green accent for investments)
  primary: '#A8DAB5',
  onPrimary: '#0D3820',
  primaryContainer: '#245234',
  onPrimaryContainer: '#C4F7D0',
  
  // Secondary - Supporting elements
  secondary: '#B8CCB9',
  onSecondary: '#243527',
  secondaryContainer: '#3A4B3C',
  onSecondaryContainer: '#D4E8D5',
  
  // Tertiary - Accent for distinctive elements
  tertiary: '#A1CED8',
  onTertiary: '#00363E',
  tertiaryContainer: '#1F4D55',
  onTertiaryContainer: '#BDEAF4',
  
  // Error states
  error: '#FFB4AB',
  onError: '#690005',
  errorContainer: '#93000A',
  onErrorContainer: '#FFDAD6',
  
  // Surface hierarchy (tonal elevation)
  background: '#0F1512',
  onBackground: '#DFE4DF',
  surface: '#0F1512',
  onSurface: '#DFE4DF',
  surfaceVariant: '#404942',
  onSurfaceVariant: '#BFC9BF',
  
  // Surface containers (M3 tonal elevation hierarchy)
  surfaceContainerLowest: '#0A0F0C',
  surfaceContainerLow: '#171D19',
  surfaceContainer: '#1B211D',
  surfaceContainerHigh: '#252B27',
  surfaceContainerHighest: '#303632',
  
  // Outline colors
  outline: '#8A938A',
  outlineVariant: '#404942',
  
  // Utility colors
  shadow: '#000000',
  scrim: 'rgba(0,0,0,0.6)',
  inverseSurface: '#DFE4DF',
  inverseOnSurface: '#2C322D',
  inversePrimary: '#3A6A4A',
  
  // Semantic colors
  success: '#A8DAB5',
  warning: '#F9DE8C',
  info: '#A1CED8',
  muted: '#8A938A',
  mutedStrong: '#5C645C',
};

const fontFamily = Platform.select({
  ios: 'SF Pro Display',
  android: 'Roboto',
  default: 'System',
});

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  screenGutter: 20,
};

export const radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 9999,
};

export const typography = {
  displayLarge: { fontFamily, fontSize: 48, lineHeight: 56, fontWeight: '700' as const, letterSpacing: -1 },
  displayMedium: { fontFamily, fontSize: 40, lineHeight: 48, fontWeight: '700' as const, letterSpacing: -0.5 },
  displaySmall: { fontFamily, fontSize: 32, lineHeight: 40, fontWeight: '600' as const, letterSpacing: -0.25 },
  headlineLarge: { fontFamily, fontSize: 28, lineHeight: 36, fontWeight: '600' as const, letterSpacing: -0.25 },
  headlineMedium: { fontFamily, fontSize: 24, lineHeight: 32, fontWeight: '600' as const, letterSpacing: 0 },
  headlineSmall: { fontFamily, fontSize: 20, lineHeight: 28, fontWeight: '600' as const, letterSpacing: 0 },
  titleLarge: { fontFamily, fontSize: 18, lineHeight: 26, fontWeight: '600' as const, letterSpacing: 0 },
  titleMedium: { fontFamily, fontSize: 16, lineHeight: 24, fontWeight: '600' as const, letterSpacing: 0 },
  titleSmall: { fontFamily, fontSize: 14, lineHeight: 20, fontWeight: '600' as const, letterSpacing: 0 },
  bodyLarge: { fontFamily, fontSize: 16, lineHeight: 24, fontWeight: '400' as const, letterSpacing: 0 },
  bodyMedium: { fontFamily, fontSize: 14, lineHeight: 22, fontWeight: '400' as const, letterSpacing: 0 },
  bodySmall: { fontFamily, fontSize: 12, lineHeight: 18, fontWeight: '400' as const, letterSpacing: 0 },
  labelLarge: { fontFamily, fontSize: 14, lineHeight: 20, fontWeight: '500' as const, letterSpacing: 0 },
  labelMedium: { fontFamily, fontSize: 12, lineHeight: 16, fontWeight: '500' as const, letterSpacing: 0 },
  labelSmall: { fontFamily, fontSize: 11, lineHeight: 14, fontWeight: '500' as const, letterSpacing: 0 },
};

export const motion = {
  duration: {
    instant: 80,
    fast: 160,
    normal: 240,
    slow: 400,
    slower: 600,
  },
  pressScale: 0.97,
};

export const elevation = {
  level0: Platform.select({ ios: {}, android: { elevation: 0 } }),
  level1: Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.15, shadowRadius: 3 },
    android: { elevation: 1 },
  }),
  level2: Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 6 },
    android: { elevation: 3 },
  }),
  level3: Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.18, shadowRadius: 10 },
    android: { elevation: 6 },
  }),
  level4: Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 12 },
    android: { elevation: 8 },
  }),
  level5: Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.22, shadowRadius: 16 },
    android: { elevation: 12 },
  }),
};

export const opacity = {
  disabled: 0.4,
  hover: 0.08,
  focus: 0.12,
  pressed: 0.14,
};

export const tokens = {
  color: m3Dark,
  spacing,
  radius,
  typography,
  motion,
  elevation,
  opacity,
};

export type Tokens = typeof tokens;
