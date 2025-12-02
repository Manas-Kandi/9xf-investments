import React from 'react';
import { Text, StyleSheet, Pressable, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, borderRadius, spacing, typography } from '../../constants/theme';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  iconPosition?: 'left' | 'right';
}

interface IconButtonProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  color?: string;
}

interface FABProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress?: () => void;
  label?: string;
  style?: ViewStyle;
}

/**
 * M3 Filled Button (Primary action)
 */
export function FilledButton({ 
  children, 
  onPress, 
  disabled, 
  loading,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.filled,
        pressed && styles.filledPressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.onPrimary} size="small" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <MaterialCommunityIcons name={icon} size={18} color={colors.onPrimary} style={styles.iconLeft} />
          )}
          <Text style={[styles.filledText, textStyle]}>{children}</Text>
          {icon && iconPosition === 'right' && (
            <MaterialCommunityIcons name={icon} size={18} color={colors.onPrimary} style={styles.iconRight} />
          )}
        </>
      )}
    </Pressable>
  );
}

/**
 * M3 Outlined Button (Secondary action)
 */
export function OutlinedButton({ 
  children, 
  onPress, 
  disabled,
  loading,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.outlined,
        pressed && styles.outlinedPressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.primary} size="small" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <MaterialCommunityIcons name={icon} size={18} color={colors.primary} style={styles.iconLeft} />
          )}
          <Text style={[styles.outlinedText, textStyle]}>{children}</Text>
          {icon && iconPosition === 'right' && (
            <MaterialCommunityIcons name={icon} size={18} color={colors.primary} style={styles.iconRight} />
          )}
        </>
      )}
    </Pressable>
  );
}

/**
 * M3 Text Button (Low emphasis)
 */
export function TextButton({ 
  children, 
  onPress, 
  disabled,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.text,
        pressed && styles.textPressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {icon && iconPosition === 'left' && (
        <MaterialCommunityIcons name={icon} size={18} color={colors.primary} style={styles.iconLeft} />
      )}
      <Text style={[styles.textButtonText, textStyle]}>{children}</Text>
      {icon && iconPosition === 'right' && (
        <MaterialCommunityIcons name={icon} size={18} color={colors.primary} style={styles.iconRight} />
      )}
    </Pressable>
  );
}

/**
 * M3 Icon Button
 */
export function IconButton({ 
  icon, 
  onPress, 
  disabled,
  size = 'md',
  style,
  color = colors.onSurfaceVariant,
}: IconButtonProps) {
  const sizes = {
    sm: { container: 32, icon: 18 },
    md: { container: 40, icon: 24 },
    lg: { container: 48, icon: 28 },
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.iconButton,
        { 
          width: sizes[size].container, 
          height: sizes[size].container,
          borderRadius: sizes[size].container / 2,
        },
        pressed && styles.iconButtonPressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <MaterialCommunityIcons name={icon} size={sizes[size].icon} color={color} />
    </Pressable>
  );
}

/**
 * M3 Floating Action Button
 */
export function FAB({ icon, onPress, label, style }: FABProps) {
  const isExtended = !!label;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.fab,
        isExtended && styles.fabExtended,
        pressed && styles.fabPressed,
        style,
      ]}
    >
      <MaterialCommunityIcons name={icon} size={24} color={colors.onPrimaryContainer} />
      {label && <Text style={styles.fabLabel}>{label}</Text>}
    </Pressable>
  );
}

/**
 * Default Button (alias for FilledButton)
 */
export const Button = FilledButton;

const styles = StyleSheet.create({
  // Filled Button
  filled: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.full,
    minHeight: 40,
  },
  filledPressed: {
    opacity: 0.88,
  },
  filledText: {
    ...typography.labelLarge,
    color: colors.onPrimary,
  },

  // Outlined Button
  outlined: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 40,
  },
  outlinedPressed: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  outlinedText: {
    ...typography.labelLarge,
    color: colors.primary,
  },

  // Text Button
  text: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    minHeight: 40,
  },
  textPressed: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  textButtonText: {
    ...typography.labelLarge,
    color: colors.primary,
  },

  // Icon Button
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonPressed: {
    backgroundColor: colors.surfaceContainerHigh,
  },

  // FAB
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryContainer,
    width: 56,
    height: 56,
    borderRadius: 16,
    gap: spacing.sm,
  },
  fabExtended: {
    width: 'auto',
    paddingHorizontal: spacing.lg,
  },
  fabPressed: {
    opacity: 0.88,
  },
  fabLabel: {
    ...typography.labelLarge,
    color: colors.onPrimaryContainer,
  },

  // Shared
  disabled: {
    opacity: 0.38,
  },
  iconLeft: {
    marginRight: spacing.xs,
  },
  iconRight: {
    marginLeft: spacing.xs,
  },
});
