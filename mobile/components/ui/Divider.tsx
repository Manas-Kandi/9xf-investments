import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '../../constants/theme';

interface DividerProps {
  inset?: boolean | 'left' | 'right' | 'both';
  style?: ViewStyle;
}

/**
 * M3 Divider
 * Thin line separator for content
 */
export function Divider({ inset = false, style }: DividerProps) {
  const getInsetStyle = () => {
    if (inset === true || inset === 'both') {
      return { marginHorizontal: spacing.md };
    }
    if (inset === 'left') {
      return { marginLeft: spacing.md };
    }
    if (inset === 'right') {
      return { marginRight: spacing.md };
    }
    return {};
  };

  return (
    <View style={[styles.divider, getInsetStyle(), style]} />
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
  },
});
