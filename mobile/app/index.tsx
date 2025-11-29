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
  const lineWidth = useRef(new Animated.Value(0)).current;
  
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
    Animated.sequence([
      // First fade in
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
      ]),
      // Then animate the line
      Animated.timing(lineWidth, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }),
    ]).start();

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

  const animatedLineWidth = lineWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 60],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Galaxy Background */}
      <View style={styles.galaxyContainer}>
        {/* Nebula gradient overlay */}
        <LinearGradient
          colors={['rgba(75, 0, 130, 0.2)', 'rgba(0, 0, 0, 0)', 'rgba(25, 25, 112, 0.1)']}
          style={styles.nebula}
          start={{ x: 0.3, y: 0.2 }}
          end={{ x: 0.7, y: 0.8 }}
        />

        {/* Static stars */}
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
        <View style={[styles.star, styles.star13]} />
        <View style={[styles.star, styles.star14]} />
        <View style={[styles.star, styles.star15]} />
        <View style={[styles.star, styles.star16]} />
        <View style={[styles.star, styles.star17]} />
        <View style={[styles.star, styles.star18]} />

        {/* Twinkling stars */}
        <Animated.View style={[styles.star, styles.twinkle1, { opacity: star1Opacity }]} />
        <Animated.View style={[styles.star, styles.twinkle2, { opacity: star2Opacity }]} />
        <Animated.View style={[styles.star, styles.twinkle3, { opacity: star3Opacity }]} />
        <Animated.View style={[styles.star, styles.twinkle4, { opacity: star4Opacity }]} />

        {/* Moving comets */}
        <Animated.View style={[styles.comet, { transform: [{ translateX: comet1X }] }]}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.3)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cometGradient}
          />
        </Animated.View>
        
        <Animated.View style={[styles.comet, { transform: [{ translateX: comet2X }] }]}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.2)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cometGradient}
          />
        </Animated.View>
        
        <Animated.View style={[styles.comet, { transform: [{ translateX: comet3X }] }]}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.25)', 'transparent']}
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
          <Animated.View style={[styles.logoLine, { width: animatedLineWidth }]} />
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
    backgroundColor: '#000000',
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

  // Nebula gradient
  nebula: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  // Stars
  star: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
  },
  // Static stars
  star1: { width: 2, height: 2, top: '8%', left: '12%', opacity: 0.6 },
  star2: { width: 3, height: 3, top: '15%', left: '25%', opacity: 0.8 },
  star3: { width: 1, height: 1, top: '22%', left: '8%', opacity: 0.4 },
  star4: { width: 2, height: 2, top: '28%', left: '45%', opacity: 0.7 },
  star5: { width: 4, height: 4, top: '35%', left: '65%', opacity: 0.9 },
  star6: { width: 2, height: 2, top: '42%', left: '78%', opacity: 0.5 },
  star7: { width: 1, height: 1, top: '48%', left: '15%', opacity: 0.3 },
  star8: { width: 3, height: 3, top: '55%', left: '35%', opacity: 0.8 },
  star9: { width: 2, height: 2, top: '62%', left: '55%', opacity: 0.6 },
  star10: { width: 1, height: 1, top: '68%', left: '85%', opacity: 0.4 },
  star11: { width: 3, height: 3, top: '75%', left: '22%', opacity: 0.7 },
  star12: { width: 2, height: 2, top: '82%', left: '42%', opacity: 0.5 },
  star13: { width: 1, height: 1, top: '88%', left: '68%', opacity: 0.3 },
  star14: { width: 2, height: 2, top: '92%', left: '15%', opacity: 0.6 },
  star15: { width: 3, height: 3, top: '5%', left: '55%', opacity: 0.8 },
  star16: { width: 1, height: 1, top: '18%', left: '88%', opacity: 0.4 },
  star17: { width: 2, height: 2, top: '52%', left: '5%', opacity: 0.5 },
  star18: { width: 1, height: 1, top: '95%', left: '75%', opacity: 0.3 },
  
  // Twinkling stars
  twinkle1: { width: 3, height: 3, top: '12%', left: '38%' },
  twinkle2: { width: 2, height: 2, top: '38%', left: '72%' },
  twinkle3: { width: 4, height: 4, top: '58%', left: '28%' },
  twinkle4: { width: 2, height: 2, top: '78%', left: '58%' },

  // Comets
  comet: {
    position: 'absolute',
    height: 2,
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
    gap: 12,
  },
  logoText: {
    fontSize: 22,
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
    }),
    fontWeight: '400',
    fontStyle: 'italic',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  logoLine: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
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
    color: 'rgba(255,255,255,0.6)',
  },
});
