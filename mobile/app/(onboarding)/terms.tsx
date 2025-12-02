import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { Button } from '../../components';
import { useAppStore } from '../../store';

export default function TermsScreen() {
  const router = useRouter();
  const { updateUser, setOnboardingStep } = useAppStore();
  const [riskAccepted, setRiskAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAgree = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    updateUser({
      terms_accepted: true,
      terms_accepted_at: new Date().toISOString(),
    });
    setOnboardingStep('complete');

    setIsLoading(false);
    router.replace('/(tabs)/home');
  };

  const isValid = riskAccepted && termsAccepted;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress indicator */}
        <View style={styles.progress}>
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
        </View>

        <Text style={styles.title}>Understand the risks</Text>

        {/* Risk Summary */}
        <View style={styles.riskCard}>
          <View style={styles.riskItem}>
            <Ionicons name="warning-outline" size={24} color={colors.warning} />
            <Text style={styles.riskText}>
              Startups are high-risk investments.
            </Text>
          </View>
          <View style={styles.riskItem}>
            <Ionicons name="alert-circle-outline" size={24} color={colors.warning} />
            <Text style={styles.riskText}>
              You could lose all the money you invest.
            </Text>
          </View>
          <View style={styles.riskItem}>
            <Ionicons name="time-outline" size={24} color={colors.warning} />
            <Text style={styles.riskText}>
              Your money may be locked for many years.
            </Text>
          </View>
          <View style={styles.riskItem}>
            <Ionicons name="information-circle-outline" size={24} color={colors.warning} />
            <Text style={styles.riskText}>
              This is not a savings account or deposit.
            </Text>
          </View>
        </View>

        {/* Links */}
        <View style={styles.links}>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>View full risk disclosure</Text>
            <Ionicons name="open-outline" size={16} color={colors.link} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>View terms of use</Text>
            <Ionicons name="open-outline" size={16} color={colors.link} />
          </TouchableOpacity>
        </View>

        {/* Checkboxes */}
        <View style={styles.checkboxes}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setRiskAccepted(!riskAccepted)}
          >
            <View style={[styles.checkboxBox, riskAccepted && styles.checkboxChecked]}>
              {riskAccepted && <Ionicons name="checkmark" size={16} color={colors.white} />}
            </View>
            <Text style={styles.checkboxLabel}>
              I understand that startup investing is high-risk and I may lose all my money.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setTermsAccepted(!termsAccepted)}
          >
            <View style={[styles.checkboxBox, termsAccepted && styles.checkboxChecked]}>
              {termsAccepted && <Ionicons name="checkmark" size={16} color={colors.white} />}
            </View>
            <Text style={styles.checkboxLabel}>
              I agree to the 9xf labs Terms and Risk Disclosure and consent to e-delivery of documents.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* CTA */}
      <View style={styles.footer}>
        <Button
          title="Agree & finish"
          onPress={handleAgree}
          fullWidth
          size="lg"
          loading={isLoading}
          disabled={!isValid}
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
  scrollContent: {
    padding: spacing.lg,
    flexGrow: 1,
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
    backgroundColor: colors.accent,
    width: 24,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xl,
  },
  riskCard: {
    backgroundColor: colors.warning + '15',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  riskItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  riskText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 24,
  },
  links: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  linkText: {
    fontSize: fontSize.md,
    color: colors.link,
  },
  checkboxes: {
    gap: spacing.lg,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 24,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
