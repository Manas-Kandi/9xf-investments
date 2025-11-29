import { Platform } from 'react-native';

// Carbon g100-inspired palette to mirror the web experience
const carbonDark = {
  primary: '#0f62fe',
  onPrimary: '#ffffff',
  primaryContainer: '#002d9c',
  onPrimaryContainer: '#f4f4f4',
  secondary: '#525252',
  onSecondary: '#f4f4f4',
  secondaryContainer: '#393939',
  onSecondaryContainer: '#f4f4f4',
  tertiary: '#78a9ff',
  onTertiary: '#161616',
  tertiaryContainer: '#262626',
  onTertiaryContainer: '#f4f4f4',
  background: '#161616',
  onBackground: '#f4f4f4',
  surface: '#161616',
  onSurface: '#f4f4f4',
  surfaceVariant: '#262626',
  onSurfaceVariant: '#c6c6c6',
  surfaceContainerLowest: '#0f0f0f',
  surfaceContainerLow: '#1f1f1f',
  surfaceContainer: '#262626',
  surfaceContainerHigh: '#333333',
  surfaceContainerHighest: '#393939',
  outline: '#525252',
  outlineVariant: '#393939',
  shadow: '#000000',
  scrim: '#000000',
  error: '#ff8389',
  onError: '#161616',
  errorContainer: '#520408',
  onErrorContainer: '#ffd7d9',
  success: '#42be65',
  warning: '#f1c21b',
  info: '#4589ff',
  muted: '#8d8d8d',
  mutedStrong: '#6f6f6f',
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
  displayLarge: { fontFamily, fontSize: 57, lineHeight: 64, fontWeight: '400' as const, letterSpacing: -0.25 },
  displayMedium: { fontFamily, fontSize: 45, lineHeight: 52, fontWeight: '400' as const, letterSpacing: 0 },
  displaySmall: { fontFamily, fontSize: 36, lineHeight: 44, fontWeight: '400' as const, letterSpacing: 0 },
  headlineLarge: { fontFamily, fontSize: 32, lineHeight: 40, fontWeight: '400' as const, letterSpacing: 0 },
  headlineMedium: { fontFamily, fontSize: 28, lineHeight: 36, fontWeight: '500' as const, letterSpacing: 0 },
  headlineSmall: { fontFamily, fontSize: 24, lineHeight: 32, fontWeight: '500' as const, letterSpacing: 0 },
  titleLarge: { fontFamily, fontSize: 22, lineHeight: 28, fontWeight: '600' as const, letterSpacing: 0 },
  titleMedium: { fontFamily, fontSize: 16, lineHeight: 24, fontWeight: '600' as const, letterSpacing: 0.15 },
  titleSmall: { fontFamily, fontSize: 14, lineHeight: 20, fontWeight: '600' as const, letterSpacing: 0.1 },
  bodyLarge: { fontFamily, fontSize: 16, lineHeight: 24, fontWeight: '400' as const, letterSpacing: 0.5 },
  bodyMedium: { fontFamily, fontSize: 14, lineHeight: 20, fontWeight: '400' as const, letterSpacing: 0.25 },
  bodySmall: { fontFamily, fontSize: 12, lineHeight: 16, fontWeight: '400' as const, letterSpacing: 0.4 },
  labelLarge: { fontFamily, fontSize: 14, lineHeight: 20, fontWeight: '600' as const, letterSpacing: 0.1 },
  labelMedium: { fontFamily, fontSize: 12, lineHeight: 16, fontWeight: '600' as const, letterSpacing: 0.5 },
  labelSmall: { fontFamily, fontSize: 11, lineHeight: 16, fontWeight: '600' as const, letterSpacing: 0.5 },
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
