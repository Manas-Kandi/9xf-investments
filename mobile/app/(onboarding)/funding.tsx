import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { Button } from '../../components';
import { useAppStore } from '../../store';

export default function FundingScreen() {
  const router = useRouter();
  const { addFundingSource } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnectBank = async () => {
    setIsLoading(true);
    // Simulate Plaid connection
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    addFundingSource({
      id: '1',
      user_id: '1',
      type: 'bank',
      institution_name: 'Chase Bank',
      last4: '4567',
      status: 'active',
      is_default: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    setIsLoading(false);
    router.push('/(onboarding)/terms');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress indicator */}
        <View style={styles.progress}>
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={styles.progressDot} />
        </View>

        <Text style={styles.title}>Add a funding method</Text>
        <Text style={styles.subtitle}>
          Link a bank or card to fund your investments.
        </Text>

        {/* Options */}
        <View style={styles.options}>
          <TouchableOpacity style={styles.optionCard} onPress={handleConnectBank}>
            <View style={styles.optionIcon}>
              <Ionicons name="business-outline" size={28} color={colors.primary} />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Connect bank account</Text>
              <Text style={styles.optionDescription}>
                Securely link your bank via Plaid
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionCard}>
            <View style={styles.optionIcon}>
              <Ionicons name="card-outline" size={28} color={colors.primary} />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Add debit card</Text>
              <Text style={styles.optionDescription}>
                Use your debit card for investments
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
      </View>

      {/* CTA */}
      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={handleConnectBank}
          fullWidth
          size="lg"
          loading={isLoading}
        />
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => router.push('/(onboarding)/terms')}
        >
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
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
    padding: spacing.lg,
  },
  progress: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surfaceSecondary,
  },
  progressDotActive: {
    backgroundColor: colors.primary,
    width: 24,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  options: {
    gap: spacing.md,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    gap: spacing.md,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  optionDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  skipButton: {
    alignItems: 'center',
    padding: spacing.md,
  },
  skipText: {
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
});
