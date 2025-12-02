import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { Button } from '../../components';

export default function KYCIntroScreen() {
  const router = useRouter();

  const features = [
    { icon: 'time-outline' as const, text: 'Takes about 2–3 minutes' },
    { icon: 'shield-checkmark-outline' as const, text: 'We use bank-level security' },
    { icon: 'lock-closed-outline' as const, text: 'Your data is encrypted' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress indicator */}
        <View style={styles.progress}>
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>

        {/* Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="person-circle-outline" size={80} color={colors.accent} />
        </View>

        {/* Content */}
        <Text style={styles.title}>Verify your identity</Text>
        <Text style={styles.subtitle}>
          We need to verify your identity once to keep the platform safe and compliant.
        </Text>

        {/* Features */}
        <View style={styles.features}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name={feature.icon} size={24} color={colors.success} />
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* CTA */}
      <View style={styles.footer}>
        <Button
          title="Start verification"
          onPress={() => router.push('/(onboarding)/kyc-details')}
          fullWidth
          size="lg"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  progress: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xxl,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surfaceSecondary,
  },
  progressDotActive: {
    backgroundColor: colors.accent,
    width: 24,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  features: {
    gap: spacing.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
  },
  featureText: {
    fontSize: fontSize.md,
    color: colors.text,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
});
