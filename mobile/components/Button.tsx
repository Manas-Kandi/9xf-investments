import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, shape, typography, components } from '../constants/theme';

// Material Design 3 Button variants
type ButtonVariant = 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'filled',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const getBackgroundColor = () => {
    if (isDisabled) {
      return variant === 'filled' || variant === 'elevated' || variant === 'tonal'
        ? colors.textMuted
        : colors.transparent;
    }
    switch (variant) {
      case 'filled': return colors.primary;
      case 'elevated': return colors.surfaceElevated;
      case 'tonal': return colors.surfaceCard;
      case 'outlined': return colors.transparent;
      case 'text': return colors.transparent;
      default: return colors.primary;
    }
  };

  const getTextColor = () => {
    if (isDisabled) return colors.textTertiary;
    switch (variant) {
      case 'filled': return colors.black;
      case 'elevated': return colors.textPrimary;
      case 'tonal': return colors.textPrimary;
      case 'outlined': return colors.textPrimary;
      case 'text': return colors.accent;
      default: return colors.black;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.base,
        { backgroundColor: getBackgroundColor() },
        variant === 'outlined' && styles.outlined,
        fullWidth && styles.fullWidth,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <Text style={[styles.label, { color: getTextColor() }, textStyle]}>
            {title}
          </Text>
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: components.button.height,
    paddingHorizontal: components.button.paddingHorizontal,
    borderRadius: components.button.borderRadius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    ...typography.labelLarge,
    fontWeight: '600',
  },
});
