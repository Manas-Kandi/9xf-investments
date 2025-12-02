import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../constants/theme';
import { useComponentTokens } from '../design-system';

// Material Design 3 Button variants with legacy aliases
type ButtonVariant = 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal' | 'ghost' | 'primary' | 'secondary';
type ButtonSize = 'md' | 'lg';

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
  size?: ButtonSize;
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
  size = 'lg',
}: ButtonProps) {
  const buttonSpec = useComponentTokens('button');
  const isDisabled = disabled || loading;

  const resolvedVariant: ButtonVariant = (() => {
    if (variant === 'primary') return 'filled';
    if (variant === 'secondary') return 'tonal';
    return variant;
  })();

  const getBackgroundColor = () => {
    if (isDisabled) {
      return resolvedVariant === 'filled' || resolvedVariant === 'elevated' || resolvedVariant === 'tonal'
        ? colors.textMuted
        : colors.transparent;
    }
    switch (resolvedVariant) {
      case 'filled': return buttonSpec.variants.filled.container;
      case 'elevated': return colors.surfaceElevated;
      case 'tonal': return buttonSpec.variants.tonal.container;
      case 'outlined': return buttonSpec.variants.outlined.container;
      case 'text': return buttonSpec.variants.text.container;
      case 'ghost': return buttonSpec.variants.ghost.container;
      default: return buttonSpec.variants.filled.container;
    }
  };

  const getTextColor = () => {
    if (isDisabled) return colors.textTertiary;
    switch (resolvedVariant) {
      case 'filled': return buttonSpec.variants.filled.content;
      case 'elevated': return colors.text;
      case 'tonal': return buttonSpec.variants.tonal.content;
      case 'outlined': return buttonSpec.variants.outlined.content;
      case 'ghost': return buttonSpec.variants.ghost.content;
      case 'text': return buttonSpec.variants.text.content;
      default: return buttonSpec.variants.filled.content;
    }
  };

  const getBorderColor = () => {
    if (resolvedVariant === 'outlined' || resolvedVariant === 'ghost') {
      return buttonSpec.variants[resolvedVariant].border || colors.border;
    }
    return undefined;
  };

  return (
    <TouchableOpacity
      style={[
        styles.base,
        {
          backgroundColor: getBackgroundColor(),
          height: buttonSpec.height[size],
          paddingHorizontal: buttonSpec.paddingX,
          borderRadius: buttonSpec.radius,
          borderColor: getBorderColor(),
          borderWidth: getBorderColor() ? 1 : 0,
        },
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
          <Text
            style={[
              styles.label,
              buttonSpec.text,
              { color: getTextColor() },
              textStyle,
            ]}
          >
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    fontWeight: '600',
  },
});
