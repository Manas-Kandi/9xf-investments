import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, fontSize } from '../constants/theme';
import { Button } from '../components';
import { useAppStore } from '../store';

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated, isOnboarded } = useAppStore();

  React.useEffect(() => {
    // Auto-redirect if already authenticated
    if (isAuthenticated && isOnboarded) {
      router.replace('/(tabs)/home');
    }
  }, [isAuthenticated, isOnboarded]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo and tagline */}
        <View style={styles.hero}>
          <Text style={styles.logo}>9xf labs</Text>
          <Text style={styles.tagline}>
            Co-invest with real VCs{'\n'}from $50.
          </Text>
        </View>

        {/* CTA buttons */}
        <View style={styles.actions}>
          <Button
            title="Get started"
            onPress={() => router.push('/(auth)/signup')}
            variant="primary"
            size="lg"
            fullWidth
          />
          <Button
            title="I already have an account"
            onPress={() => router.push('/(auth)/signin')}
            variant="secondary"
            size="lg"
            fullWidth
          />
        </View>

        {/* Risk disclaimer */}
        <Text style={styles.disclaimer}>
          Investing involves risk. You may lose money.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  hero: {
    alignItems: 'center',
    marginBottom: spacing.xxl * 2,
  },
  logo: {
    fontSize: fontSize.display,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  tagline: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 28,
  },
  actions: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  disclaimer: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
