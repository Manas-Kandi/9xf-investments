import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  Animated, 
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useRootNavigationState } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { space, radius, color, type, motion } from '../constants/design-system';
import { useAppStore } from '../store';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Vibrant accent color - electric mint
const ACCENT = '#00F5A0';
const ACCENT_SECONDARY = '#00D9F5';

export default function SplashScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isAuthenticated, isOnboarded } = useAppStore();
  const navigationState = useRootNavigationState();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  // Animation values
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(30)).current;
  const gradientAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

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
    // Fade in content
    Animated.parallel([
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous gradient animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(gradientAnim, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: false,
        }),
        Animated.timing(gradientAnim, {
          toValue: 0,
          duration: 8000,
          useNativeDriver: false,
        }),
      ])
    ).start();

    // Subtle pulse on button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Interpolate gradient position
  const gradientTranslate = gradientAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -200],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Animated gradient background */}
      <Animated.View 
        style={[
          styles.gradientContainer,
          { transform: [{ translateY: gradientTranslate }] }
        ]}
      >
        <LinearGradient
          colors={['#000000', '#0a1a15', '#000000', '#0a0a1a', '#000000']}
          locations={[0, 0.3, 0.5, 0.7, 1]}
          style={styles.gradient}
        />
        
        {/* Abstract orbs */}
        <View style={[styles.orb, styles.orb1]} />
        <View style={[styles.orb, styles.orb2]} />
        <View style={[styles.orb, styles.orb3]} />
      </Animated.View>

      {/* Content */}
      <Animated.View 
        style={[
          styles.content, 
          { 
            paddingTop: insets.top + space.block,
            opacity: fadeIn,
            transform: [{ translateY: slideUp }],
          }
        ]}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>9xf</Text>
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Hero text */}
        <View style={styles.hero}>
          <Text style={styles.headline}>
            Invest alongside{'\n'}top VCs
          </Text>
          <Text style={styles.supporting}>
            From $50. Same deal terms as the pros.
          </Text>
        </View>
      </Animated.View>

      {/* Bottom actions */}
      <Animated.View 
        style={[
          styles.bottom, 
          { 
            paddingBottom: insets.bottom + space.large,
            opacity: fadeIn,
          }
        ]}
      >
        {/* Get Started - Vibrant accent button */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/(auth)/signup')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[ACCENT, ACCENT_SECONDARY]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.primaryButtonText}>Get started</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Sign in - Ghost button */}
        <TouchableOpacity
          style={styles.ghostButton}
          onPress={() => router.push('/(auth)/signin')}
          activeOpacity={0.7}
        >
          <Text style={styles.ghostButtonText}>I already have an account</Text>
        </TouchableOpacity>

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          Capital at risk. Not FDIC insured.
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  
  // Animated background
  gradientContainer: {
    position: 'absolute',
    top: -200,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT + 400,
  },
  gradient: {
    flex: 1,
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
  },
  orb1: {
    width: 300,
    height: 300,
    backgroundColor: ACCENT,
    opacity: 0.08,
    top: '15%',
    left: -100,
  },
  orb2: {
    width: 250,
    height: 250,
    backgroundColor: ACCENT_SECONDARY,
    opacity: 0.06,
    top: '45%',
    right: -80,
  },
  orb3: {
    width: 200,
    height: 200,
    backgroundColor: '#8B5CF6',
    opacity: 0.05,
    bottom: '20%',
    left: '30%',
  },

  // Content
  content: {
    flex: 1,
    paddingHorizontal: space.large,
  },
  logoContainer: {
    alignSelf: 'flex-start',
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  spacer: {
    flex: 1,
  },
  hero: {
    marginBottom: space.block,
  },
  headline: {
    fontSize: 44,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 52,
    letterSpacing: -1.5,
    marginBottom: space.medium,
  },
  supporting: {
    fontSize: 18,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 26,
  },

  // Bottom
  bottom: {
    paddingHorizontal: space.large,
    gap: space.small,
  },
  primaryButton: {
    borderRadius: radius.round,
    overflow: 'hidden',
  },
  buttonGradient: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: 0.2,
  },
  ghostButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
  },
  disclaimer: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.35)',
    textAlign: 'center',
    marginTop: space.medium,
  },
});
