import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  Animated, 
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRouter, useRootNavigationState } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { space, radius } from '../constants/design-system';
import { colors } from '../constants/theme';
import { useAppStore } from '../store';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isAuthenticated, isOnboarded } = useAppStore();
  const navigationState = useRootNavigationState();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  // Animation values
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(40)).current;
  
  // Wave animations
  const wave1Y = useRef(new Animated.Value(0)).current;
  const wave2X = useRef(new Animated.Value(0)).current;
  const wave3Scale = useRef(new Animated.Value(1)).current;
  
  // Floating particles
  const particle1Y = useRef(new Animated.Value(0)).current;
  const particle2Y = useRef(new Animated.Value(0)).current;
  const particle3Y = useRef(new Animated.Value(0)).current;
  const particle4Y = useRef(new Animated.Value(0)).current;
  const particle5Y = useRef(new Animated.Value(0)).current;
  const particle6Y = useRef(new Animated.Value(0)).current;
  const particle7Y = useRef(new Animated.Value(0)).current;
  const particle8Y = useRef(new Animated.Value(0)).current;
  
  // Comet animations
  const comet1X = useRef(new Animated.Value(-200)).current;
  const comet2X = useRef(new Animated.Value(-250)).current;
  const comet3X = useRef(new Animated.Value(-180)).current;
  
  // Star twinkling animations
  const star1Opacity = useRef(new Animated.Value(1)).current;
  const star2Opacity = useRef(new Animated.Value(0.5)).current;
  const star3Opacity = useRef(new Animated.Value(0.8)).current;
  const star4Opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (navigationState?.key) {
      setIsNavigationReady(true);
    }
  }, [navigationState?.key]);

  useEffect(() => {
    if (isNavigationReady && isAuthenticated && isOnboarded) {
      router.replace('/(tabs)/home');
    }
  }, [isNavigationReady, isAuthenticated, isOnboarded]);

  // Start animations on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Wave animations
    Animated.loop(
      Animated.sequence([
        Animated.timing(wave1Y, { toValue: 100, duration: 12000, useNativeDriver: true }),
        Animated.timing(wave1Y, { toValue: -100, duration: 12000, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(wave2X, { toValue: 80, duration: 15000, useNativeDriver: true }),
        Animated.timing(wave2X, { toValue: -80, duration: 15000, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(wave3Scale, { toValue: 1.1, duration: 8000, useNativeDriver: true }),
        Animated.timing(wave3Scale, { toValue: 0.9, duration: 8000, useNativeDriver: true }),
      ])
    ).start();

    // Floating particles
    Animated.loop(
      Animated.sequence([
        Animated.timing(particle1Y, { toValue: -SCREEN_HEIGHT - 50, duration: 6000, useNativeDriver: true }),
        Animated.timing(particle1Y, { toValue: 50, duration: 0, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(particle2Y, { toValue: -SCREEN_HEIGHT - 60, duration: 7000, useNativeDriver: true }),
        Animated.timing(particle2Y, { toValue: 60, duration: 0, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(particle3Y, { toValue: -SCREEN_HEIGHT - 40, duration: 5500, useNativeDriver: true }),
        Animated.timing(particle3Y, { toValue: 40, duration: 0, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(particle4Y, { toValue: -SCREEN_HEIGHT - 55, duration: 6500, useNativeDriver: true }),
        Animated.timing(particle4Y, { toValue: 55, duration: 0, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(particle5Y, { toValue: -SCREEN_HEIGHT - 45, duration: 5800, useNativeDriver: true }),
        Animated.timing(particle5Y, { toValue: 45, duration: 0, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(particle6Y, { toValue: -SCREEN_HEIGHT - 65, duration: 7200, useNativeDriver: true }),
        Animated.timing(particle6Y, { toValue: 65, duration: 0, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(particle7Y, { toValue: -SCREEN_HEIGHT - 50, duration: 6400, useNativeDriver: true }),
        Animated.timing(particle7Y, { toValue: 50, duration: 0, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(particle8Y, { toValue: -SCREEN_HEIGHT - 55, duration: 6900, useNativeDriver: true }),
        Animated.timing(particle8Y, { toValue: 55, duration: 0, useNativeDriver: true }),
      ])
    ).start();

    // Comet animations
    Animated.loop(
      Animated.sequence([
        Animated.timing(comet1X, { toValue: SCREEN_WIDTH + 200, duration: 4000, useNativeDriver: true }),
        Animated.timing(comet1X, { toValue: -200, duration: 0, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(comet2X, { toValue: SCREEN_WIDTH + 250, duration: 5000, useNativeDriver: true }),
        Animated.timing(comet2X, { toValue: -250, duration: 0, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(comet3X, { toValue: SCREEN_WIDTH + 180, duration: 3500, useNativeDriver: true }),
        Animated.timing(comet3X, { toValue: -180, duration: 0, useNativeDriver: true }),
      ])
    ).start();

    // Star twinkling animations
    Animated.loop(
      Animated.sequence([
        Animated.timing(star1Opacity, { toValue: 0.3, duration: 2000, useNativeDriver: true }),
        Animated.timing(star1Opacity, { toValue: 1, duration: 2000, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(star2Opacity, { toValue: 0.8, duration: 2500, useNativeDriver: true }),
        Animated.timing(star2Opacity, { toValue: 0.3, duration: 2500, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(star3Opacity, { toValue: 0.4, duration: 1800, useNativeDriver: true }),
        Animated.timing(star3Opacity, { toValue: 0.9, duration: 1800, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(star4Opacity, { toValue: 0.6, duration: 2200, useNativeDriver: true }),
        Animated.timing(star4Opacity, { toValue: 0.2, duration: 2200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  
  // Wave interpolations
  const wave1Translate = wave1Y.interpolate({
    inputRange: [-100, 100],
    outputRange: [-100, 100],
  });

  const wave2Translate = wave2X.interpolate({
    inputRange: [-80, 80],
    outputRange: [-80, 80],
  });

  const wave3ScaleValue = wave3Scale.interpolate({
    inputRange: [0.9, 1.1],
    outputRange: [0.9, 1.1],
  });

  // Particle positions
  const particle1Pos = particle1Y.interpolate({
    inputRange: [-SCREEN_HEIGHT - 50, 50],
    outputRange: [-SCREEN_HEIGHT - 50, SCREEN_HEIGHT + 50],
  });

  const particle2Pos = particle2Y.interpolate({
    inputRange: [-SCREEN_HEIGHT - 60, 60],
    outputRange: [-SCREEN_HEIGHT - 60, SCREEN_HEIGHT + 60],
  });

  const particle3Pos = particle3Y.interpolate({
    inputRange: [-SCREEN_HEIGHT - 40, 40],
    outputRange: [-SCREEN_HEIGHT - 40, SCREEN_HEIGHT + 40],
  });

  const particle4Pos = particle4Y.interpolate({
    inputRange: [-SCREEN_HEIGHT - 55, 55],
    outputRange: [-SCREEN_HEIGHT - 55, SCREEN_HEIGHT + 55],
  });

  const particle5Pos = particle5Y.interpolate({
    inputRange: [-SCREEN_HEIGHT - 45, 45],
    outputRange: [-SCREEN_HEIGHT - 45, SCREEN_HEIGHT + 45],
  });

  const particle6Pos = particle6Y.interpolate({
    inputRange: [-SCREEN_HEIGHT - 65, 65],
    outputRange: [-SCREEN_HEIGHT - 65, SCREEN_HEIGHT + 65],
  });

  const particle7Pos = particle7Y.interpolate({
    inputRange: [-SCREEN_HEIGHT - 50, 50],
    outputRange: [-SCREEN_HEIGHT - 50, SCREEN_HEIGHT + 50],
  });

  const particle8Pos = particle8Y.interpolate({
    inputRange: [-SCREEN_HEIGHT - 55, 55],
    outputRange: [-SCREEN_HEIGHT - 55, SCREEN_HEIGHT + 55],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Dynamic Galaxy Background */}
      <View style={styles.galaxyContainer}>
        {/* Dark nebula waves */}
        <Animated.View style={[styles.nebulaWave, styles.nebula1, { transform: [{ translateY: wave1Translate }] }]}>
          <LinearGradient
            colors={['rgba(30, 0, 60, 0.6)', 'rgba(10, 0, 30, 0.4)', 'rgba(0, 0, 0, 0)']}
            style={styles.gradientFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animated.View>

        <Animated.View style={[styles.nebulaWave, styles.nebula2, { transform: [{ translateX: wave2Translate }] }]}>
          <LinearGradient
            colors={['rgba(60, 0, 120, 0.5)', 'rgba(20, 0, 50, 0.3)', 'rgba(0, 0, 0, 0)']}
            style={styles.gradientFill}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
        </Animated.View>

        <Animated.View style={[styles.nebulaWave, styles.nebula3, { transform: [{ scale: wave3ScaleValue }] }]}>
          <LinearGradient
            colors={['rgba(40, 0, 80, 0.4)', 'rgba(15, 0, 40, 0.2)', 'rgba(0, 0, 0, 0)']}
            style={styles.gradientFill}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          />
        </Animated.View>

        {/* Floating particles */}
        <Animated.View style={[styles.floatingParticle, styles.particle1, { transform: [{ translateY: particle1Pos }] }]} />
        <Animated.View style={[styles.floatingParticle, styles.particle2, { transform: [{ translateY: particle2Pos }] }]} />
        <Animated.View style={[styles.floatingParticle, styles.particle3, { transform: [{ translateY: particle3Pos }] }]} />
        <Animated.View style={[styles.floatingParticle, styles.particle4, { transform: [{ translateY: particle4Pos }] }]} />
        <Animated.View style={[styles.floatingParticle, styles.particle5, { transform: [{ translateY: particle5Pos }] }]} />
        <Animated.View style={[styles.floatingParticle, styles.particle6, { transform: [{ translateY: particle6Pos }] }]} />
        <Animated.View style={[styles.floatingParticle, styles.particle7, { transform: [{ translateY: particle7Pos }] }]} />
        <Animated.View style={[styles.floatingParticle, styles.particle8, { transform: [{ translateY: particle8Pos }] }]} />

        {/* Dimmer stars */}
        <View style={[styles.star, styles.star1]} />
        <View style={[styles.star, styles.star2]} />
        <View style={[styles.star, styles.star3]} />
        <View style={[styles.star, styles.star4]} />
        <View style={[styles.star, styles.star5]} />
        <View style={[styles.star, styles.star6]} />
        <View style={[styles.star, styles.star7]} />
        <View style={[styles.star, styles.star8]} />
        <View style={[styles.star, styles.star9]} />
        <View style={[styles.star, styles.star10]} />
        <View style={[styles.star, styles.star11]} />
        <View style={[styles.star, styles.star12]} />

        {/* Subtle twinkling stars */}
        <Animated.View style={[styles.star, styles.twinkle1, { opacity: star1Opacity }]} />
        <Animated.View style={[styles.star, styles.twinkle2, { opacity: star2Opacity }]} />
        <Animated.View style={[styles.star, styles.twinkle3, { opacity: star3Opacity }]} />
        <Animated.View style={[styles.star, styles.twinkle4, { opacity: star4Opacity }]} />

        {/* Brighter comets for contrast */}
        <Animated.View style={[styles.comet, { transform: [{ translateX: comet1X }] }]}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.5)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cometGradient}
          />
        </Animated.View>
        
        <Animated.View style={[styles.comet, { transform: [{ translateX: comet2X }] }]}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.4)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cometGradient}
          />
        </Animated.View>
        
        <Animated.View style={[styles.comet, { transform: [{ translateX: comet3X }] }]}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.45)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cometGradient}
          />
        </Animated.View>
      </View>

      {/* Content */}
      <Animated.View 
        style={[
          styles.content, 
          { 
            paddingTop: insets.top + 24,
            opacity: fadeIn,
            transform: [{ translateY: slideUp }],
          }
        ]}
      >
        {/* Logo */}
        <View style={styles.logoRow}>
          <Text style={styles.logoText}>9xf</Text>
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.headline}>
            Own a Piece{'\n'}of the Future.
          </Text>
        </View>
      </Animated.View>

      {/* Bottom */}
      <Animated.View 
        style={[
          styles.bottom, 
          { 
            paddingBottom: insets.bottom + 32,
            opacity: fadeIn,
          }
        ]}
      >
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/(auth)/signup')}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.ghostButton}
          onPress={() => router.push('/(auth)/signin')}
          activeOpacity={0.6}
        >
          <Text style={styles.ghostButtonText}>Sign In</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Galaxy Background
  galaxyContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },

  // Nebula waves
  nebulaWave: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  nebula1: {
    width: SCREEN_WIDTH * 1.5,
    height: SCREEN_HEIGHT * 1.5,
    top: -SCREEN_HEIGHT * 0.25,
    left: -SCREEN_WIDTH * 0.25,
  },
  nebula2: {
    width: SCREEN_WIDTH * 1.3,
    height: SCREEN_HEIGHT * 1.3,
    top: -SCREEN_HEIGHT * 0.15,
    left: -SCREEN_WIDTH * 0.15,
  },
  nebula3: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    top: 0,
    left: 0,
  },
  gradientFill: {
    flex: 1,
  },

  // Floating particles
  floatingParticle: {
    position: 'absolute',
    backgroundColor: colors.primary + '66',
    borderRadius: 50,
  },
  particle1: { width: 3, height: 3, left: '15%' },
  particle2: { width: 2, height: 2, left: '30%' },
  particle3: { width: 4, height: 4, left: '45%' },
  particle4: { width: 2, height: 2, left: '60%' },
  particle5: { width: 3, height: 3, left: '75%' },
  particle6: { width: 2, height: 2, left: '20%' },
  particle7: { width: 3, height: 3, left: '50%' },
  particle8: { width: 2, height: 2, left: '85%' },

  // Stars (dimmer)
  star: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
  },
  star1: { width: 1, height: 1, top: '8%', left: '12%', opacity: 0.3 },
  star2: { width: 2, height: 2, top: '15%', left: '25%', opacity: 0.4 },
  star3: { width: 1, height: 1, top: '22%', left: '8%', opacity: 0.2 },
  star4: { width: 1, height: 1, top: '28%', left: '45%', opacity: 0.3 },
  star5: { width: 2, height: 2, top: '35%', left: '65%', opacity: 0.5 },
  star6: { width: 1, height: 1, top: '42%', left: '78%', opacity: 0.2 },
  star7: { width: 1, height: 1, top: '48%', left: '15%', opacity: 0.15 },
  star8: { width: 2, height: 2, top: '55%', left: '35%', opacity: 0.4 },
  star9: { width: 1, height: 1, top: '62%', left: '55%', opacity: 0.3 },
  star10: { width: 1, height: 1, top: '68%', left: '85%', opacity: 0.2 },
  star11: { width: 2, height: 2, top: '75%', left: '22%', opacity: 0.35 },
  star12: { width: 1, height: 1, top: '82%', left: '42%', opacity: 0.25 },
  
  // Twinkling stars (subtle)
  twinkle1: { width: 2, height: 2, top: '12%', left: '38%' },
  twinkle2: { width: 1, height: 1, top: '38%', left: '72%' },
  twinkle3: { width: 2, height: 2, top: '58%', left: '28%' },
  twinkle4: { width: 1, height: 1, top: '78%', left: '58%' },

  // Comets (brighter)
  comet: {
    position: 'absolute',
    height: 3,
  },
  comet1: { top: '20%', width: 120 },
  comet2: { top: '45%', width: 100 },
  comet3: { top: '70%', width: 140 },
  cometGradient: {
    flex: 1,
    height: '100%',
  },

  content: {
    flex: 1,
    paddingHorizontal: 28,
  },

  // Logo
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '200',
    color: '#FFFFFF',
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
    }),
    fontStyle: 'italic',
    letterSpacing: 1,
  },
  
  spacer: {
    flex: 0.5,
  },

  // Hero
  hero: {
    marginBottom: 48,
  },
  headline: {
    fontSize: 56,
    fontWeight: '200',
    color: '#FFFFFF',
    lineHeight: 64,
    letterSpacing: -1,
  },

  // Bottom
  bottom: {
    paddingHorizontal: 28,
    gap: 12,
  },
  primaryButton: {
    height: 54,
    backgroundColor: colors.primary,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.onPrimary,
    letterSpacing: 0.3,
  },
  ghostButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostButtonText: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textSecondary,
  },
});
