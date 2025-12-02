import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { colors, borderRadius } from '../../constants/theme';

type ElevationLevel = 0 | 1 | 2 | 3 | 4 | 5;

interface SurfaceProps {
  children: React.ReactNode;
  elevation?: ElevationLevel;
  style?: ViewStyle;
  rounded?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

/**
 * M3 Surface Component
 * 
 * Implements Material Design 3 tonal surface hierarchy.
 * Higher elevation = lighter surface color in dark theme.
 */
export function Surface({ 
  children, 
  elevation = 0, 
  style,
  rounded = 'md',
}: SurfaceProps) {
  const surfaceColors: Record<ElevationLevel, string> = {
    0: colors.surface,
    1: colors.surfaceContainerLow,
    2: colors.surfaceContainer,
    3: colors.surfaceContainerHigh,
    4: colors.surfaceContainerHighest,
    5: colors.surfaceContainerHighest,
  };

  const getRadius = () => {
    if (rounded === false) return 0;
    if (rounded === true || rounded === 'md') return borderRadius.md;
    return borderRadius[rounded];
  };

  return (
    <View
      style={[
        styles.surface,
        {
          backgroundColor: surfaceColors[elevation],
          borderRadius: getRadius(),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    overflow: 'hidden',
  },
});
