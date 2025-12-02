import React from 'react';
import { View, ViewStyle, StyleSheet, Pressable } from 'react-native';
import { colors, borderRadius, spacing, shadows } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

/**
 * M3 Elevated Card
 * Uses shadow elevation + tonal surface
 */
export function ElevatedCard({ children, style, onPress }: CardProps) {
  const content = (
    <View style={[styles.elevated, style]}>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.pressed]}>
        {content}
      </Pressable>
    );
  }
  return content;
}

/**
 * M3 Filled Card
 * Uses tonal surface color, no shadow
 */
export function FilledCard({ children, style, onPress }: CardProps) {
  const content = (
    <View style={[styles.filled, style]}>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.pressed]}>
        {content}
      </Pressable>
    );
  }
  return content;
}

/**
 * M3 Outlined Card
 * Uses outline border, transparent background
 */
export function OutlinedCard({ children, style, onPress }: CardProps) {
  const content = (
    <View style={[styles.outlined, style]}>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.pressed]}>
        {content}
      </Pressable>
    );
  }
  return content;
}

/**
 * Default Card (alias for FilledCard)
 */
export const Card = FilledCard;

const styles = StyleSheet.create({
  elevated: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.level2,
  },
  filled: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  outlined: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  pressed: {
    opacity: 0.88,
  },
});
