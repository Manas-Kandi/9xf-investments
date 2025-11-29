import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useRouter, useRootNavigationState } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, typography, shape } from '../constants/theme';
import { Button } from '../components';
import { useAppStore } from '../store';

export default function SplashScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isAuthenticated, isOnboarded } = useAppStore();
  const navigationState = useRootNavigationState();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      {/* Content */}
      <View style={[styles.content, { paddingTop: insets.top + spacing.xxxl }]}>
        {/* Hero */}
        <View style={styles.hero}>
          {/* Logo mark */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>9xf</Text>
          </View>
          
          <Text style={styles.headline}>
            Invest alongside{'\n'}top VCs
          </Text>
          <Text style={styles.supporting}>
            From $50. Same deal terms as the pros.
          </Text>
        </View>
      </View>

      {/* Bottom actions */}
      <View style={[styles.bottom, { paddingBottom: insets.bottom + spacing.lg }]}>
        <Button
          title="Get started"
          onPress={() => router.push('/(auth)/signup')}
          variant="filled"
          fullWidth
        />
        <Button
          title="Sign in"
          onPress={() => router.push('/(auth)/signin')}
          variant="text"
          fullWidth
        />
        <Text style={styles.disclaimer}>
          Capital at risk. Not FDIC insured.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: shape.lg,
    backgroundColor: colors.cardMint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  logoText: {
    ...typography.headlineMedium,
    color: colors.onCardMint,
    fontWeight: '700',
  },
  headline: {
    ...typography.displaySmall,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  supporting: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
  },
  bottom: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  disclaimer: {
    ...typography.bodySmall,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
