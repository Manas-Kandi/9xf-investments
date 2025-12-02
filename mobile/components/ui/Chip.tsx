import React from 'react';
import { Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, borderRadius, spacing, typography } from '../../constants/theme';

interface ChipProps {
  label: string;
  onPress?: () => void;
  selected?: boolean;
  disabled?: boolean;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  style?: ViewStyle;
}

/**
 * M3 Filter Chip
 * Used for filtering content
 */
export function FilterChip({ 
  label, 
  onPress, 
  selected = false,
  disabled,
  icon,
  style,
}: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.filterChip,
        selected && styles.filterChipSelected,
        pressed && styles.chipPressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {selected && (
        <MaterialCommunityIcons 
          name="check" 
          size={18} 
          color={colors.onSecondaryContainer} 
          style={styles.chipIcon}
        />
      )}
      {icon && !selected && (
        <MaterialCommunityIcons 
          name={icon} 
          size={18} 
          color={colors.onSurfaceVariant} 
          style={styles.chipIcon}
        />
      )}
      <Text style={[
        styles.filterChipText,
        selected && styles.filterChipTextSelected,
      ]}>
        {label}
      </Text>
    </Pressable>
  );
}

/**
 * M3 Input Chip
 * Used for user input like tags
 */
export function InputChip({ 
  label, 
  onPress, 
  icon,
  style,
}: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.inputChip,
        pressed && styles.chipPressed,
        style,
      ]}
    >
      {icon && (
        <MaterialCommunityIcons 
          name={icon} 
          size={18} 
          color={colors.onSurfaceVariant} 
          style={styles.chipIcon}
        />
      )}
      <Text style={styles.inputChipText}>{label}</Text>
      <MaterialCommunityIcons 
        name="close" 
        size={18} 
        color={colors.onSurfaceVariant} 
        style={styles.chipClose}
      />
    </Pressable>
  );
}

/**
 * M3 Assist Chip
 * Used for smart suggestions
 */
export function AssistChip({ 
  label, 
  onPress, 
  icon,
  style,
}: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.assistChip,
        pressed && styles.chipPressed,
        style,
      ]}
    >
      {icon && (
        <MaterialCommunityIcons 
          name={icon} 
          size={18} 
          color={colors.primary} 
          style={styles.chipIcon}
        />
      )}
      <Text style={styles.assistChipText}>{label}</Text>
    </Pressable>
  );
}

/**
 * Default Chip (alias for FilterChip)
 */
export const Chip = FilterChip;

const styles = StyleSheet.create({
  // Filter Chip
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'transparent',
  },
  filterChipSelected: {
    backgroundColor: colors.secondaryContainer,
    borderColor: colors.secondaryContainer,
  },
  filterChipText: {
    ...typography.labelLarge,
    color: colors.onSurfaceVariant,
  },
  filterChipTextSelected: {
    color: colors.onSecondaryContainer,
  },

  // Input Chip
  inputChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingLeft: spacing.sm,
    paddingRight: spacing.xs,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'transparent',
  },
  inputChipText: {
    ...typography.labelLarge,
    color: colors.onSurfaceVariant,
  },

  // Assist Chip
  assistChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'transparent',
  },
  assistChipText: {
    ...typography.labelLarge,
    color: colors.onSurfaceVariant,
  },

  // Shared
  chipPressed: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  chipIcon: {
    marginRight: spacing.xs,
  },
  chipClose: {
    marginLeft: spacing.xs,
  },
  disabled: {
    opacity: 0.38,
  },
});
