import { tokens, componentTokens, typography as typeScale } from '../design-system';

// Centralized Material Darkest palette with legacy-friendly aliases
export const colors = {
  background: tokens.color.background,
  surface: tokens.color.surface,
  surfaceElevated: tokens.color.surfaceContainerHigh,
  surfaceCard: tokens.color.surfaceContainer,
  surfaceSecondary: tokens.color.surfaceContainerHigh,
  surfaceContainer: tokens.color.surfaceContainer,
  surfaceContainerLow: tokens.color.surfaceContainerLow,
  surfaceContainerHighest: tokens.color.surfaceContainerHighest,
  textPrimary: tokens.color.onSurface,
  textSecondary: tokens.color.onSurfaceVariant,
  textTertiary: tokens.color.muted,
  textMuted: tokens.color.mutedStrong,
  textPlaceholder: tokens.color.muted,
  primary: tokens.color.primary,
  primaryMuted: 'rgba(156, 202, 255, 0.16)',
  primaryContainer: tokens.color.primaryContainer,
  onPrimary: tokens.color.onPrimary,
  onPrimaryContainer: tokens.color.onPrimaryContainer,
  secondary: tokens.color.secondary,
  secondaryContainer: tokens.color.secondaryContainer,
  onSecondaryContainer: tokens.color.onSecondaryContainer,
  onSecondary: tokens.color.onSecondary ?? tokens.color.onSecondaryContainer,
  tertiary: tokens.color.tertiary,
  onTertiary: tokens.color.onTertiary,
  accent: tokens.color.tertiary,
  accentSecondary: tokens.color.info,
  link: tokens.color.info,
  success: tokens.color.success,
  error: tokens.color.error,
  warning: tokens.color.warning,
  info: tokens.color.info,
  border: tokens.color.outline,
  borderLight: tokens.color.outlineVariant,
  borderSubtle: tokens.color.outlineVariant,
  borderStrong: tokens.color.outline,
  onSurface: tokens.color.onSurface,
  onSurfaceVariant: tokens.color.onSurfaceVariant,
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  overlay: tokens.color.scrim,
};

export const typography = typeScale;

export const shape = {
  none: 0,
  xs: tokens.radius.xs,
  sm: tokens.radius.sm,
  md: tokens.radius.md,
  lg: tokens.radius.lg,
  xl: tokens.radius.xl,
  xxl: 32,
  full: tokens.radius.pill,
  extraSmall: tokens.radius.xs,
  small: tokens.radius.sm,
  medium: tokens.radius.md,
  large: tokens.radius.lg,
  extraLarge: tokens.radius.xl,
};

export const radius = shape;
export const borderRadius = shape;

export const spacing = {
  none: 0,
  xxs: tokens.spacing.xxs,
  xs: tokens.spacing.xs,
  sm: tokens.spacing.sm,
  md: tokens.spacing.md,
  lg: tokens.spacing.lg,
  xl: tokens.spacing.xl,
  xxl: tokens.spacing.xxl,
  xxxl: tokens.spacing.xxl + tokens.spacing.md,
};

export const elevation = tokens.elevation;
export const shadows = tokens.elevation;

export const stateLayer = {
  hover: tokens.opacity.hover,
  focus: tokens.opacity.focus,
  pressed: tokens.opacity.pressed,
  dragged: 0.16,
};

export const components = {
  button: {
    height: componentTokens.button.height.lg,
    paddingHorizontal: componentTokens.button.paddingX,
    borderRadius: componentTokens.button.radius,
  },
  filledButton: {
    height: componentTokens.button.height.lg,
    paddingHorizontal: componentTokens.button.paddingX,
    borderRadius: componentTokens.button.radius,
  },
  outlinedButton: {
    height: componentTokens.button.height.lg,
    paddingHorizontal: componentTokens.button.paddingX,
    borderRadius: componentTokens.button.radius,
    borderWidth: 1,
  },
  textButton: {
    height: componentTokens.button.height.md,
    paddingHorizontal: Math.round(componentTokens.button.paddingX / 1.5),
    borderRadius: componentTokens.button.radius,
  },
  input: {
    height: componentTokens.input.height,
    borderRadius: componentTokens.input.radius,
    paddingHorizontal: componentTokens.input.paddingX,
  },
  textField: {
    height: componentTokens.input.height,
    borderRadius: componentTokens.input.radius,
    paddingHorizontal: componentTokens.input.paddingX,
  },
  card: {
    borderRadius: componentTokens.card.radius,
    padding: componentTokens.card.padding,
  },
  accentCard: {
    borderRadius: componentTokens.card.radius,
    padding: componentTokens.card.padding,
  },
  navigationBar: {
    height: componentTokens.navBar.height,
  },
  tabBar: {
    height: componentTokens.tabBar.height,
  },
  listItem: {
    minHeight: componentTokens.listItem.minHeight,
    paddingHorizontal: componentTokens.listItem.paddingX,
    paddingVertical: componentTokens.listItem.paddingY,
    borderRadius: componentTokens.listItem.radius,
  },
};

export const fontSize = {
  xs: typography.labelSmall.fontSize,
  sm: typography.bodySmall.fontSize,
  md: typography.bodyMedium.fontSize,
  lg: typography.bodyLarge.fontSize,
  xl: typography.titleLarge.fontSize,
  xxl: typography.headlineSmall.fontSize,
  xxxl: typography.headlineMedium.fontSize,
  display: typography.displayLarge.fontSize,
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
