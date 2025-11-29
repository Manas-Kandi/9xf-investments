import { Platform } from 'react-native';

// Modern dark palette - cleaner, more contrast
const carbonDark = {
  primary: '#22C55E', // Green accent like the inspiration
  onPrimary: '#ffffff',
  primaryContainer: '#166534',
  onPrimaryContainer: '#f0fdf4',
  secondary: '#6B7280',
  onSecondary: '#ffffff',
  secondaryContainer: '#1F2937',
  onSecondaryContainer: '#F9FAFB',
  tertiary: '#A78BFA', // Purple accent for variety
  onTertiary: '#1F2937',
  tertiaryContainer: '#2E1065',
  onTertiaryContainer: '#F5F3FF',
  background: '#0A0A0A', // Deeper black
  onBackground: '#FAFAFA',
  surface: '#0A0A0A',
  onSurface: '#FAFAFA',
  surfaceVariant: '#171717',
  onSurfaceVariant: '#A3A3A3',
  surfaceContainerLowest: '#050505',
  surfaceContainerLow: '#0F0F0F',
  surfaceContainer: '#171717',
  surfaceContainerHigh: '#1F1F1F',
  surfaceContainerHighest: '#262626',
  outline: '#404040',
  outlineVariant: '#262626',
  shadow: '#000000',
  scrim: 'rgba(0,0,0,0.6)',
  error: '#EF4444',
  onError: '#ffffff',
  errorContainer: '#7F1D1D',
  onErrorContainer: '#FEE2E2',
  success: '#22C55E',
  warning: '#F59E0B',
  info: '#3B82F6',
  muted: '#737373',
  mutedStrong: '#525252',
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
  color: carbonDark,
  spacing,
  radius,
  typography,
  motion,
  elevation,
  opacity,
};

export type Tokens = typeof tokens;
