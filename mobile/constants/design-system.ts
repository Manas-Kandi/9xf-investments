import { Dimensions } from 'react-native';
import {
  tokens,
  componentTokens,
  typography as typeScale,
  spacing as spacingScale,
  radius as radiusScale,
  motion as motionScale,
  elevation as elevationScale,
} from '../design-system';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const grid = {
  unit: spacingScale.xs,
  x1: spacingScale.xs,
  x2: spacingScale.sm,
  x3: spacingScale.md + spacingScale.xs, // 24
  x4: spacingScale.lg, // 24 in tokens, keep legacy 32 by adding xs
  x5: spacingScale.lg + spacingScale.xs, // 32+8 = 40
  x6: spacingScale.xl, // 32
  x7: spacingScale.xl + spacingScale.xs, // 40
  x8: spacingScale.xxl, // 48
  x10: spacingScale.xxl + spacingScale.md, // 64
  x12: spacingScale.xxl + spacingScale.lg, // 72
};

export const space = {
  none: 0,
  micro: spacingScale.xxs,
  tiny: spacingScale.xs,
  small: spacingScale.sm,
  medium: spacingScale.md,
  large: spacingScale.lg,
  section: spacingScale.lg + spacingScale.xs,
  block: spacingScale.xl,
  screenX: spacingScale.lg,
  screenY: spacingScale.md,
  cardX: spacingScale.lg,
  cardY: spacingScale.lg,
};

export const size = {
  touchMin: 48,
  buttonHeight: {
    small: componentTokens.button.height.md - 8,
    medium: componentTokens.button.height.md,
    large: componentTokens.button.height.lg,
  },
  inputHeight: componentTokens.input.height,
  icon: {
    small: 16,
    medium: 20,
    large: 24,
    xlarge: 32,
  },
  avatar: {
    small: 32,
    medium: 40,
    large: 48,
    xlarge: 64,
  },
  card: {
    minHeight: 80,
    dealCard: {
      width: 160,
      height: 200,
    },
  },
  tabBar: componentTokens.tabBar.height,
  header: componentTokens.navBar.height,
  progressBar: 4,
  badge: 20,
};

export const radius = {
  none: 0,
  xs: radiusScale.xs,
  sm: radiusScale.sm,
  md: radiusScale.md,
  lg: radiusScale.lg,
  xl: radiusScale.xl,
  xxl: 28,
  round: radiusScale.pill,
};

export const palette = {
  ...tokens.color,
};

export const color = {
  bg: tokens.color.background,
  bgPrimary: tokens.color.background,
  bgElevated: tokens.color.surfaceContainerHigh,
  bgCard: tokens.color.surfaceContainer,
  bgOverlay: tokens.color.scrim,
  textPrimary: tokens.color.onSurface,
  textSecondary: tokens.color.onSurfaceVariant,
  textTertiary: tokens.color.muted,
  textDisabled: tokens.color.mutedStrong,
  border: tokens.color.outline,
  borderSubtle: tokens.color.outlineVariant,
  accent: tokens.color.primary,
  accentText: tokens.color.onPrimary,
  link: tokens.color.info,
  info: tokens.color.info,
  success: tokens.color.success,
  error: tokens.color.error,
  warning: tokens.color.warning,
  cards: [
    { bg: tokens.color.primary, text: tokens.color.onPrimary },
    { bg: tokens.color.secondaryContainer, text: tokens.color.onSecondaryContainer },
    { bg: tokens.color.tertiaryContainer, text: tokens.color.onTertiaryContainer ?? tokens.color.onSecondaryContainer },
    { bg: tokens.color.surfaceContainerHigh, text: tokens.color.onSurface },
  ],
};

export const type = {
  ...typeScale,
  mono: {
    fontFamily: 'Menlo',
    fontSize: 14,
    letterSpacing: 0,
  },
};

export const motion = {
  duration: motionScale.duration,
  easing: {
    easeOut: 'cubic-bezier(0.33, 1, 0.68, 1)',
    easeIn: 'cubic-bezier(0.32, 0, 0.67, 0)',
    easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  spring: {
    snappy: { damping: 20, stiffness: 400, mass: 0.8 },
    gentle: { damping: 15, stiffness: 150, mass: 1 },
    bouncy: { damping: 10, stiffness: 200, mass: 0.5 },
    stiff: { damping: 25, stiffness: 500, mass: 1 },
  },
  press: {
    scale: motionScale.pressScale,
    opacity: 0.9,
  },
  stagger: {
    fast: 30,
    normal: 50,
    slow: 80,
  },
};

export const shadow = {
  none: {},
  small: elevationScale.level1,
  medium: elevationScale.level3,
  large: elevationScale.level5,
};

export const layout = {
  screen: { width: SCREEN_WIDTH, height: SCREEN_HEIGHT },
  container: { flex: 1, backgroundColor: color.bg },
  screenPadding: { paddingHorizontal: space.screenX },
  row: { flexDirection: 'row' as const, alignItems: 'center' as const },
  rowBetween: { flexDirection: 'row' as const, alignItems: 'center' as const, justifyContent: 'space-between' as const },
  center: { alignItems: 'center' as const, justifyContent: 'center' as const },
};

export const preset = {
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
  input: {
    height: size.inputHeight,
    backgroundColor: color.bgCard,
    borderRadius: radius.md,
    paddingHorizontal: space.medium,
    ...type.bodyLarge,
    color: color.textPrimary,
  },
  listItem: {
    minHeight: size.touchMin,
    paddingVertical: space.small,
    paddingHorizontal: space.screenX,
    ...layout.rowBetween,
  },
};

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
