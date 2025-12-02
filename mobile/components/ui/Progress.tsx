import React from 'react';
import { View, StyleSheet, ViewStyle, Animated } from 'react-native';
import { colors, borderRadius } from '../../constants/theme';

interface ProgressBarProps {
  progress: number; // 0-100
  color?: string;
  trackColor?: string;
  height?: number;
  style?: ViewStyle;
}

interface CircularProgressProps {
  progress?: number; // 0-100, undefined = indeterminate
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  style?: ViewStyle;
}

/**
 * M3 Linear Progress Indicator
 */
export function ProgressBar({ 
  progress, 
  color = colors.primary,
  trackColor = colors.surfaceContainerHighest,
  height = 4,
  style,
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <View style={[styles.progressTrack, { height, backgroundColor: trackColor }, style]}>
      <View 
        style={[
          styles.progressFill, 
          { 
            width: `${clampedProgress}%`, 
            backgroundColor: color,
            height,
          }
        ]} 
      />
    </View>
  );
}

/**
 * M3 Circular Progress Indicator
 */
export function CircularProgress({ 
  progress,
  size = 40,
  strokeWidth = 4,
  color = colors.primary,
  trackColor = colors.surfaceContainerHighest,
  style,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const isIndeterminate = progress === undefined;
  const strokeDashoffset = isIndeterminate 
    ? circumference * 0.75 
    : circumference - (circumference * Math.min(100, Math.max(0, progress)) / 100);

  return (
    <View style={[{ width: size, height: size }, style]}>
      <View style={[styles.circularContainer, { width: size, height: size }]}>
        {/* Track */}
        <View
          style={[
            styles.circularTrack,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: trackColor,
            },
          ]}
        />
        {/* Progress arc - simplified version using border */}
        <View
          style={[
            styles.circularProgress,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: color,
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              transform: [{ rotate: `${(progress || 25) * 3.6}deg` }],
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressTrack: {
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    borderRadius: borderRadius.full,
  },
  circularContainer: {
    position: 'relative',
  },
  circularTrack: {
    position: 'absolute',
  },
  circularProgress: {
    position: 'absolute',
  },
});
