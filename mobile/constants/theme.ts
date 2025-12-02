import { tokens } from '../design-system';

/**
 * Minimal Theme
 * 
 * Simple, flat exports from tokens.
 * Backwards-compatible aliases for migration.
 */

export const colors = {
  // Backgrounds
  bg: tokens.color.black,
  bgElevated: tokens.color.elevated,
  bgCard: tokens.color.card,
  bgCardHigh: tokens.color.elevated,
  bgSubtle: tokens.color.subtle,
  
  // Legacy aliases
  background: tokens.color.black,
  surface: tokens.color.card,
  surfaceCard: tokens.color.card,
  surfaceElevated: tokens.color.elevated,
  surfaceSecondary: tokens.color.elevated,
  
  // Text
  text: tokens.color.textPrimary,
  textSecondary: tokens.color.textSecondary,
  textMuted: tokens.color.textTertiary,
  textTertiary: tokens.color.textTertiary,
  textPlaceholder: tokens.color.textTertiary,
  textVariant: tokens.color.textSecondary,
  
  // Accent / Primary
  accent: tokens.color.accent,
  accentMuted: tokens.color.accentMuted,
  link: tokens.color.accent,
  onPrimary: tokens.color.black,
  
  // Borders
  border: tokens.color.border,
  borderStrong: tokens.color.borderStrong,
  
  // States
  error: tokens.color.error,
  success: tokens.color.success,
  warning: tokens.color.warning,
  info: tokens.color.info,
  
  // Utility
  white: tokens.color.white,
  black: tokens.color.black,
  transparent: 'transparent',
};

export const typography = tokens.typography;
export const spacing = tokens.spacing;
export const radius = tokens.radius;
export const borderRadius = tokens.radius; // Legacy alias
export const shape = tokens.radius; // Legacy alias
export const motion = tokens.motion;

// Legacy fontSize export
export const fontSize = {
  xs: 11,
  sm: 13,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

// Legacy components export (empty, for backwards compatibility)
export const components = {
  button: { height: 48, paddingHorizontal: 24, borderRadius: 24 },
  input: { height: 48, borderRadius: 12, paddingHorizontal: 16 },
  card: { borderRadius: 16, padding: 16 },
};

export default { colors, typography, spacing, radius, motion };
