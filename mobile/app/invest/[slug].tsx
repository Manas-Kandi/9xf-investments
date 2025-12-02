import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { Button } from '../../components';
import { getCampaignBySlug } from '@shared/mock-data';
import { useAppStore } from '../../store';

type InvestStep = 'amount' | 'confirm' | 'processing' | 'success' | 'error';

const PRESET_AMOUNTS = [50, 100, 250, 500];

export default function InvestScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const { user, fundingSources, defaultFundingSourceId, addInvestment } = useAppStore();
  
  const campaign = getCampaignBySlug(slug || '');
  const defaultFunding = fundingSources.find(f => f.id === defaultFundingSourceId);
  
  const [step, setStep] = useState<InvestStep>('amount');
  const [amount, setAmount] = useState(campaign?.min_investment || 50);
  const [confirmed, setConfirmed] = useState(false);

  if (!campaign) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorState}>
          <Text style={styles.errorText}>Deal not found</Text>
          <Button title="Go back" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  const handleContinue = () => {
    if (amount >= campaign.min_investment && amount <= campaign.max_investment_per_person) {
      setStep('confirm');
    }
  };

  const handleConfirmInvestment = async () => {
    if (!confirmed) return;

    setStep('processing');

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create investment record
    addInvestment({
      id: Date.now().toString(),
      user_id: user?.id || '1',
      campaign_id: campaign.id,
      amount,
      status: 'confirmed',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      campaign,
    });

    setStep('success');
  };

  const renderAmountStep = () => (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>
          How much do you want to invest in {campaign.company_name}?
        </Text>

        {/* Preset amounts */}
        <View style={styles.presetGrid}>
          {PRESET_AMOUNTS.map((preset) => (
            <TouchableOpacity
              key={preset}
              style={[
                styles.presetButton,
                amount === preset && styles.presetButtonActive,
              ]}
              onPress={() => setAmount(preset)}
            >
              <Text
                style={[
                  styles.presetText,
                  amount === preset && styles.presetTextActive,
                ]}
              >
                ${preset}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Custom amount display */}
        <View style={styles.amountDisplay}>
          <Text style={styles.amountCurrency}>$</Text>
          <Text style={styles.amountValue}>{amount}</Text>
        </View>

        <Text style={styles.amountHint}>
          Minimum: ${campaign.min_investment} · Maximum: ${campaign.max_investment_per_person}
        </Text>

        {/* Funding source */}
        <View style={styles.fundingSection}>
          <Text style={styles.fundingLabel}>Funds will be taken from:</Text>
          <TouchableOpacity style={styles.fundingCard}>
            <Ionicons name="card-outline" size={24} color={colors.textSecondary} />
            <Text style={styles.fundingText}>
              {defaultFunding
                ? `${defaultFunding.institution_name} ••••${defaultFunding.last4}`
                : 'Add payment method'}
            </Text>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button
          title="Continue"
          onPress={handleContinue}
          fullWidth
          size="lg"
          disabled={amount < campaign.min_investment || amount > campaign.max_investment_per_person}
        />
      </View>
    </>
  );

  const renderConfirmStep = () => (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setStep('amount')} style={styles.closeButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Confirm your investment</Text>

        <View style={styles.confirmCard}>
          <Text style={styles.confirmAmount}>${amount}</Text>
          <Text style={styles.confirmCompany}>into {campaign.company_name}</Text>
          <Text style={styles.confirmTerms}>
            You will be co-investing alongside {campaign.vc_info?.name || 'the VC'} on the same terms through a pooled vehicle.
          </Text>
        </View>

        <View style={styles.riskBox}>
          <Ionicons name="warning-outline" size={20} color={colors.warning} />
          <Text style={styles.riskText}>
            This is high risk and long term. You may lose all of this money and may not be able to sell this investment for many years.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setConfirmed(!confirmed)}
        >
          <View style={[styles.checkboxBox, confirmed && styles.checkboxChecked]}>
            {confirmed && <Ionicons name="checkmark" size={16} color={colors.white} />}
          </View>
          <Text style={styles.checkboxLabel}>
            I confirm this investment and understand the risks.
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button
          title="Confirm investment"
          onPress={handleConfirmInvestment}
          fullWidth
          size="lg"
          disabled={!confirmed}
        />
      </View>
    </>
  );

  const renderProcessingStep = () => (
    <View style={styles.centerContent}>
      <ActivityIndicator size="large" color={colors.accent} />
      <Text style={styles.processingText}>
        Processing your investment...
      </Text>
      <Text style={styles.processingSubtext}>
        This may take a few seconds.
      </Text>
    </View>
  );

  const renderSuccessStep = () => (
    <View style={styles.centerContent}>
      <View style={styles.successIcon}>
        <Ionicons name="checkmark" size={48} color={colors.white} />
      </View>
      <Text style={styles.successTitle}>Investment confirmed</Text>
      <Text style={styles.successText}>
        You have invested ${amount} into {campaign.company_name}.
      </Text>
      <Text style={styles.successSubtext}>
        You will receive an email with details and documents.
      </Text>
      <View style={styles.successActions}>
        <Button
          title="View in portfolio"
          onPress={() => router.replace('/(tabs)/portfolio')}
          fullWidth
          size="lg"
        />
        <Button
          title="Browse more deals"
          onPress={() => router.replace('/(tabs)/home')}
          variant="secondary"
          fullWidth
          size="lg"
        />
      </View>
    </View>
  );

  const renderErrorStep = () => (
    <View style={styles.centerContent}>
      <View style={styles.errorIcon}>
        <Ionicons name="alert" size={48} color={colors.white} />
      </View>
      <Text style={styles.errorTitle}>We couldn't complete your investment</Text>
      <Text style={styles.errorSubtext}>
        It looks like there was an issue with your payment method or connection.
      </Text>
      <View style={styles.successActions}>
        <Button
          title="Try again"
          onPress={() => setStep('confirm')}
          fullWidth
          size="lg"
        />
        <Button
          title="Update funding method"
          onPress={() => {}}
          variant="secondary"
          fullWidth
          size="lg"
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {step === 'amount' && renderAmountStep()}
      {step === 'confirm' && renderConfirmStep()}
      {step === 'processing' && renderProcessingStep()}
      {step === 'success' && renderSuccessStep()}
      {step === 'error' && renderErrorStep()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  closeButton: {
    padding: spacing.sm,
  },
  scrollContent: {
    padding: spacing.lg,
    flexGrow: 1,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  presetButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  presetButtonActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accent + '15',
  },
  presetText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  presetTextActive: {
    color: colors.accent,
  },
  amountDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  amountCurrency: {
    fontSize: fontSize.xxl,
    color: colors.textMuted,
    marginRight: spacing.xs,
  },
  amountValue: {
    fontSize: 56,
    fontWeight: '600',
    color: colors.text,
  },
  amountHint: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  fundingSection: {
    marginTop: spacing.lg,
  },
  fundingLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  fundingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    gap: spacing.md,
  },
  fundingText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
  },
  bottomBar: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  confirmCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  confirmAmount: {
    fontSize: 48,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  confirmCompany: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  confirmTerms: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  riskBox: {
    backgroundColor: colors.warning + '15',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  riskText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text,
    lineHeight: 20,
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
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  processingText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  processingSubtext: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  successTitle: {
    fontSize: fontSize.xxl,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  successText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  successSubtext: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  successActions: {
    width: '100%',
    gap: spacing.md,
  },
  errorIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  errorTitle: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  errorState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  errorText: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
});
