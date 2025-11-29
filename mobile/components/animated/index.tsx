// =============================================================================
// Animated Components - Motion-first UI primitives
// =============================================================================

import React, { useRef, useEffect } from 'react';
import {
  Animated,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  StyleSheet,
  Easing,
} from 'react-native';
import { motion } from '../../constants/design-system';

// =============================================================================
// PRESS SCALE - Animate scale on press
// =============================================================================
interface PressableScaleProps extends TouchableOpacityProps {
  scaleValue?: number;
  duration?: number;
  children: React.ReactNode;
}

export function PressableScale({
  scaleValue = motion.press.scale,
  duration = motion.duration.fast,
  children,
  style,
  disabled,
  ...props
}: PressableScaleProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateIn = () => {
    Animated.spring(scale, {
      toValue: scaleValue,
      useNativeDriver: true,
      ...motion.spring.snappy,
    }).start();
  };

  const animateOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      ...motion.spring.snappy,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={animateIn}
      onPressOut={animateOut}
      disabled={disabled}
      {...props}
    >
      <Animated.View style={[{ transform: [{ scale }] }, style]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}

// =============================================================================
// FADE IN - Animate opacity on mount
// =============================================================================
interface FadeInProps extends ViewProps {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

export function FadeIn({
  delay = 0,
  duration = motion.duration.normal,
  children,
  style,
  ...props
}: FadeInProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start();
  }, []);

  return (
    <Animated.View style={[{ opacity }, style]} {...props}>
      {children}
    </Animated.View>
  );
}

// =============================================================================
// SLIDE UP - Animate from below on mount
// =============================================================================
interface SlideUpProps extends ViewProps {
  delay?: number;
  duration?: number;
  distance?: number;
  children: React.ReactNode;
}

export function SlideUp({
  delay = 0,
  duration = motion.duration.normal,
  distance = 20,
  children,
  style,
  ...props
}: SlideUpProps) {
  const translateY = useRef(new Animated.Value(distance)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[{ opacity, transform: [{ translateY }] }, style]}
      {...props}
    >
      {children}
    </Animated.View>
  );
}

// =============================================================================
// STAGGERED LIST - Animate children with stagger delay
// =============================================================================
interface StaggeredListProps extends ViewProps {
  staggerDelay?: number;
  children: React.ReactNode;
}

export function StaggeredList({
  staggerDelay = motion.stagger.normal,
  children,
  style,
  ...props
}: StaggeredListProps) {
  const childArray = React.Children.toArray(children);

  return (
    <View style={style} {...props}>
      {childArray.map((child, index) => (
        <SlideUp key={index} delay={index * staggerDelay}>
          {child}
        </SlideUp>
      ))}
    </View>
  );
}

// =============================================================================
// SCALE IN - Pop in animation
// =============================================================================
interface ScaleInProps extends ViewProps {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

export function ScaleIn({
  delay = 0,
  duration = motion.duration.normal,
  children,
  style,
  ...props
}: ScaleInProps) {
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        delay,
        useNativeDriver: true,
        ...motion.spring.bouncy,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[{ opacity, transform: [{ scale }] }, style]}
      {...props}
    >
      {children}
    </Animated.View>
  );
}

// =============================================================================
// SHAKE - Error shake animation
// =============================================================================
interface ShakeProps extends ViewProps {
  trigger?: boolean;
  children: React.ReactNode;
}

export function Shake({
  trigger = false,
  children,
  style,
  ...props
}: ShakeProps) {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (trigger) {
      Animated.sequence([
        Animated.timing(translateX, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(translateX, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(translateX, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(translateX, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(translateX, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  }, [trigger]);

  return (
    <Animated.View style={[{ transform: [{ translateX }] }, style]} {...props}>
      {children}
    </Animated.View>
  );
}

// =============================================================================
// PULSE - Gentle pulsing animation
// =============================================================================
interface PulseProps extends ViewProps {
  active?: boolean;
  children: React.ReactNode;
}

export function Pulse({
  active = true,
  children,
  style,
  ...props
}: PulseProps) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (active) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      ).start();
    } else {
      scale.setValue(1);
    }
  }, [active]);

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]} {...props}>
      {children}
    </Animated.View>
  );
}

// =============================================================================
// NUMBER TICKER - Animated counting number
// =============================================================================
interface NumberTickerProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  style?: any;
}

export function NumberTicker({
  value,
  duration = motion.duration.slow,
  prefix = '',
  suffix = '',
  style,
}: NumberTickerProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayValue, setDisplayValue] = React.useState(0);

  useEffect(() => {
    const listener = animatedValue.addListener(({ value: v }) => {
      setDisplayValue(Math.floor(v));
    });

    Animated.timing(animatedValue, {
      toValue: value,
      duration,
      useNativeDriver: false,
      easing: Easing.out(Easing.cubic),
    }).start();

    return () => animatedValue.removeListener(listener);
  }, [value]);

  return (
    <Animated.Text style={style}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </Animated.Text>
  );
}

// =============================================================================
// PROGRESS BAR - Animated progress
// =============================================================================
interface AnimatedProgressProps extends ViewProps {
  progress: number; // 0-100
  color?: string;
  trackColor?: string;
  height?: number;
}

export function AnimatedProgress({
  progress,
  color = '#C8F7DC',
  trackColor = '#262626',
  height = 4,
  style,
  ...props
}: AnimatedProgressProps) {
  const width = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(width, {
      toValue: progress,
      useNativeDriver: false,
      ...motion.spring.gentle,
    }).start();
  }, [progress]);

  return (
    <View
      style={[
        { height, backgroundColor: trackColor, borderRadius: height / 2, overflow: 'hidden' },
        style,
      ]}
      {...props}
    >
      <Animated.View
        style={{
          height: '100%',
          backgroundColor: color,
          borderRadius: height / 2,
          width: width.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          }),
        }}
      />
    </View>
  );
}

export default {
  PressableScale,
  FadeIn,
  SlideUp,
  StaggeredList,
  ScaleIn,
  Shake,
  Pulse,
  NumberTicker,
  AnimatedProgress,
};
