// 9xf labs Dark Theme - Consistent with Carbon g100
export const colors = {
  // Backgrounds
  background: '#161616',
  backgroundElevated: '#262626',
  backgroundHover: '#333333',
  surface: '#262626',
  surfaceSecondary: '#393939',
  
  // Text
  textPrimary: '#f4f4f4',
  textSecondary: '#c6c6c6',
  textMuted: '#8d8d8d',
  textPlaceholder: '#6f6f6f',
  
  // Brand
  primary: '#0f62fe',
  primaryHover: '#0353e9',
  
  // Status
  success: '#42be65',
  successLight: '#defbe6',
  warning: '#f1c21b',
  error: '#ff8389',
  errorLight: '#fff1f1',
  info: '#4589ff',
  
  // Borders
  borderSubtle: '#393939',
  borderStrong: '#525252',
  
  // Links
  link: '#78a9ff',
  linkHover: '#a6c8ff',
  
  // Misc
  white: '#ffffff',
  black: '#000000',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  display: 40,
};

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
};

export default {
  colors,
  spacing,
  fontSize,
  fontWeight,
  borderRadius,
  shadows,
};
