import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius, spacing, typography } from '../../constants/theme';

interface BadgeProps {
  children?: React.ReactNode;
  count?: number;
  visible?: boolean;
  style?: ViewStyle;
}

interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  label: string;
  style?: ViewStyle;
}

/**
 * M3 Badge
 * Small indicator for notifications
 */
export function Badge({ 
  children, 
  count, 
  visible = true,
  style,
}: BadgeProps) {
  if (!visible) return null;

  const hasCount = typeof count === 'number';
  const displayCount = hasCount && count > 99 ? '99+' : count;

  return (
    <View style={[
      styles.badge,
      hasCount && styles.badgeWithCount,
      style,
    ]}>
      {hasCount && (
        <Text style={styles.badgeText}>{displayCount}</Text>
      )}
      {children}
    </View>
  );
}

/**
 * M3 Status Badge
 * Semantic status indicator
 */
export function StatusBadge({ status, label, style }: StatusBadgeProps) {
  const statusColors = {
    success: { bg: colors.primary + '22', text: colors.primary },
    warning: { bg: colors.warning + '22', text: colors.warning },
    error: { bg: colors.error + '22', text: colors.error },
    info: { bg: colors.info + '22', text: colors.info },
    neutral: { bg: colors.surfaceContainerHigh, text: colors.onSurfaceVariant },
  };

  const colorScheme = statusColors[status];

  return (
    <View style={[
      styles.statusBadge,
      { backgroundColor: colorScheme.bg },
      style,
    ]}>
      <Text style={[styles.statusBadgeText, { color: colorScheme.text }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    minWidth: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.error,
  },
  badgeWithCount: {
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    ...typography.labelSmall,
    color: colors.onError,
    fontSize: 10,
    lineHeight: 12,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.full,
  },
  statusBadgeText: {
    ...typography.labelSmall,
    fontWeight: '600',
  },
});
