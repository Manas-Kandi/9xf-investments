// =============================================================================
// 9xf labs Design System
// A comprehensive, motion-first design system with strict consistency
// =============================================================================

import { Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// =============================================================================
// GRID SYSTEM - 8pt grid, everything is a multiple of 8
// =============================================================================
const GRID_UNIT = 8;

export const grid = {
  unit: GRID_UNIT,
  x1: GRID_UNIT * 1,   // 8
  x2: GRID_UNIT * 2,   // 16
  x3: GRID_UNIT * 3,   // 24
  x4: GRID_UNIT * 4,   // 32
  x5: GRID_UNIT * 5,   // 40
  x6: GRID_UNIT * 6,   // 48
  x7: GRID_UNIT * 7,   // 56
  x8: GRID_UNIT * 8,   // 64
  x10: GRID_UNIT * 10, // 80
  x12: GRID_UNIT * 12, // 96
};

// =============================================================================
// SPACING - Semantic spacing based on grid
// =============================================================================
export const space = {
  none: 0,
  
  // Micro spacing (inside components)
  micro: grid.x1 / 2,  // 4
  tiny: grid.x1,        // 8
  
  // Component spacing
  small: grid.x2,       // 16
  medium: grid.x3,      // 24
  large: grid.x4,       // 32
  
  // Section spacing
  section: grid.x5,     // 40
  block: grid.x6,       // 48
  
  // Screen padding (consistent everywhere)
  screenX: grid.x3,     // 24 - horizontal screen padding
  screenY: grid.x2,     // 16 - vertical screen padding
  
  // Card internal padding
  cardX: grid.x2,       // 16
  cardY: grid.x2,       // 16
};

// =============================================================================
// SIZES - Fixed sizes for all components
// =============================================================================
export const size = {
  // Touch targets (minimum 48pt for accessibility)
  touchMin: 48,
  
  // Buttons
  buttonHeight: {
    small: grid.x5,     // 40
    medium: grid.x6,    // 48
    large: grid.x7,     // 56
  },
  
  // Inputs
  inputHeight: grid.x7, // 56
  
  // Icons
  icon: {
    small: 16,
    medium: 20,
    large: 24,
    xlarge: 32,
  },
  
  // Avatars
  avatar: {
    small: grid.x4,     // 32
    medium: grid.x5,    // 40
    large: grid.x6,     // 48
    xlarge: grid.x8,    // 64
  },
  
  // Cards
  card: {
    minHeight: grid.x10, // 80
    dealCard: {
      width: 160,
      height: 200,
    },
  },
  
  // Navigation
  tabBar: grid.x8,      // 64
  header: grid.x7,      // 56
  
  // Indicators
  progressBar: 4,
  badge: 20,
};

// =============================================================================
// RADIUS - Consistent border radius
// =============================================================================
export const radius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  round: 9999,
};

// =============================================================================
// COLORS - Dark theme with pastel accents
// =============================================================================
export const palette = {
  // Neutrals
  black: '#000000',
  gray950: '#0A0A0A',
  gray900: '#141414',
  gray850: '#1A1A1A',
  gray800: '#262626',
  gray700: '#404040',
  gray600: '#525252',
  gray500: '#6B6B6B',
  gray400: '#A0A0A0',
  gray300: '#D4D4D4',
  gray200: '#E5E5E5',
  gray100: '#F5F5F5',
  white: '#FFFFFF',
  
  // Pastels (accent cards)
  mint: '#C8F7DC',
  mintDark: '#14532D',
  cream: '#F5E6D3',
  creamDark: '#78350F',
  cyan: '#7DD3FC',
  cyanDark: '#0C4A6E',
  lavender: '#DDD6FE',
  lavenderDark: '#4C1D95',
  peach: '#FECACA',
  peachDark: '#7F1D1D',
};

export const color = {
  // Backgrounds
  bg: palette.black,
  bgElevated: palette.gray950,
  bgCard: palette.gray850,
  bgOverlay: 'rgba(0,0,0,0.8)',
  
  // Text
  textPrimary: palette.white,
  textSecondary: palette.gray400,
  textTertiary: palette.gray500,
  textDisabled: palette.gray700,
  
  // Borders
  border: palette.gray800,
  borderSubtle: palette.gray850,
  
  // Interactive
  accent: palette.mint,
  accentText: palette.mintDark,
  link: palette.cyan,
  
  // Status
  success: palette.mint,
  error: palette.peach,
  warning: '#FDE68A',
  
  // Card colors
  cards: [
    { bg: palette.mint, text: palette.mintDark },
    { bg: palette.cream, text: palette.creamDark },
    { bg: palette.cyan, text: palette.cyanDark },
    { bg: palette.lavender, text: palette.lavenderDark },
  ],
};

// =============================================================================
// TYPOGRAPHY - Strict type scale
// =============================================================================
const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

export const type = {
  // Display - Hero numbers
  displayLarge: {
    fontFamily,
    fontSize: 56,
    lineHeight: 64,
    fontWeight: '300' as const,
    letterSpacing: -1.5,
  },
  displayMedium: {
    fontFamily,
    fontSize: 44,
    lineHeight: 52,
    fontWeight: '300' as const,
    letterSpacing: -1,
  },
  displaySmall: {
    fontFamily,
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '400' as const,
    letterSpacing: -0.5,
  },
  
  // Headlines
  headlineLarge: {
    fontFamily,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  headlineMedium: {
    fontFamily,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  headlineSmall: {
    fontFamily,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  
  // Titles
  titleLarge: {
    fontFamily,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  titleMedium: {
    fontFamily,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600' as const,
    letterSpacing: 0.1,
  },
  titleSmall: {
    fontFamily,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600' as const,
    letterSpacing: 0.1,
  },
  
  // Body
  bodyLarge: {
    fontFamily,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
    letterSpacing: 0.15,
  },
  bodyMedium: {
    fontFamily,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontFamily,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
    letterSpacing: 0.4,
  },
  
  // Labels
  labelLarge: {
    fontFamily,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontFamily,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontFamily,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
  },
  
  // Mono (numbers)
  mono: {
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
    fontSize: 14,
    letterSpacing: 0,
  },
};

// =============================================================================
// MOTION - Animation system with spring physics
// =============================================================================
export const motion = {
  // Durations (ms)
  duration: {
    instant: 100,
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 800,
  },
  
  // Easing curves (for non-spring animations)
  easing: {
    easeOut: 'cubic-bezier(0.33, 1, 0.68, 1)',
    easeIn: 'cubic-bezier(0.32, 0, 0.67, 0)',
    easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  
  // Spring configs (for react-native-reanimated)
  spring: {
    // Snappy - for button presses, toggles
    snappy: {
      damping: 20,
      stiffness: 400,
      mass: 0.8,
    },
    // Gentle - for page transitions, modals
    gentle: {
      damping: 15,
      stiffness: 150,
      mass: 1,
    },
    // Bouncy - for playful interactions
    bouncy: {
      damping: 10,
      stiffness: 200,
      mass: 0.5,
    },
    // Stiff - for quick snaps
    stiff: {
      damping: 25,
      stiffness: 500,
      mass: 1,
    },
  },
  
  // Standard transforms for interactions
  press: {
    scale: 0.97,
    opacity: 0.9,
  },
  
  // Stagger delays for lists
  stagger: {
    fast: 30,
    normal: 50,
    slow: 80,
  },
};

// =============================================================================
// SHADOWS
// =============================================================================
export const shadow = {
  none: {},
  small: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    android: { elevation: 2 },
  }),
  medium: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: { elevation: 4 },
  }),
  large: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
    },
    android: { elevation: 8 },
  }),
};

// =============================================================================
// LAYOUT HELPERS
// =============================================================================
export const layout = {
  screen: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  
  // Standard container
  container: {
    flex: 1,
    backgroundColor: color.bg,
  },
  
  // Screen with padding
  screenPadding: {
    paddingHorizontal: space.screenX,
  },
  
  // Flex helpers
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  rowBetween: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  center: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
};

// =============================================================================
// COMPONENT PRESETS - Ready-to-use styles
// =============================================================================
export const preset = {
  // Buttons
  buttonFilled: {
    height: size.buttonHeight.large,
    borderRadius: radius.round,
    backgroundColor: color.accent,
    paddingHorizontal: space.large,
    ...layout.center,
    flexDirection: 'row' as const,
  },
  buttonOutline: {
    height: size.buttonHeight.large,
    borderRadius: radius.round,
    borderWidth: 1,
    borderColor: color.border,
    backgroundColor: 'transparent',
    paddingHorizontal: space.large,
    ...layout.center,
    flexDirection: 'row' as const,
  },
  buttonGhost: {
    height: size.buttonHeight.medium,
    paddingHorizontal: space.medium,
    ...layout.center,
    flexDirection: 'row' as const,
  },
  
  // Cards
  card: {
    backgroundColor: color.bgCard,
    borderRadius: radius.xl,
    padding: space.medium,
  },
  cardElevated: {
    backgroundColor: color.bgCard,
    borderRadius: radius.xl,
    padding: space.medium,
    ...shadow.medium,
  },
  
  // Inputs
  input: {
    height: size.inputHeight,
    backgroundColor: color.bgCard,
    borderRadius: radius.md,
    paddingHorizontal: space.medium,
    ...type.bodyLarge,
    color: color.textPrimary,
  },
  
  // List items
  listItem: {
    minHeight: size.touchMin,
    paddingVertical: space.small,
    paddingHorizontal: space.screenX,
    ...layout.rowBetween,
  },
};

// =============================================================================
// EXPORTS
// =============================================================================
export default {
  grid,
  space,
  size,
  radius,
  palette,
  color,
  type,
  motion,
  shadow,
  layout,
  preset,
};
