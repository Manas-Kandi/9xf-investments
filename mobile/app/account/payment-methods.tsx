import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { Button } from '../../components';
import { useAppStore } from '../../store';
import type { FundingSource } from '../../types';

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const { fundingSources, defaultFundingSourceId, setDefaultFundingSource, removeFundingSource, addFundingSource } =
    useAppStore();
  const [isAddingMethod, setIsAddingMethod] = useState(false);

  const handleSetDefault = (id: string) => {
    setDefaultFundingSource(id);
  };

  const handleRemove = (source: FundingSource) => {
    Alert.alert(
      'Remove Payment Method',
      `Are you sure you want to remove ${source.institution_name || 'this payment method'}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeFundingSource(source.id),
        },
      ]
    );
  };

  const handleAddMethod = async () => {
    setIsAddingMethod(true);

    // Simulate Plaid connection
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Add mock funding source
    const newSource: FundingSource = {
      id: Date.now().toString(),
      user_id: '1',
      type: 'bank',
      institution_name: 'Chase Bank',
      last4: '4321',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    addFundingSource(newSource);
    setIsAddingMethod(false);

    Alert.alert('Success', 'Your bank account has been linked.');
  };

  const getIcon = (type: FundingSource['type']) => {
    switch (type) {
      case 'bank':
        return 'bank-outline';
      case 'card':
        return 'card-outline';
      default:
        return 'wallet-outline';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="shield-checkmark" size={20} color={colors.success} />
          <Text style={styles.infoText}>
            Your payment information is securely stored and encrypted. We never store your login
            credentials.
          </Text>
        </View>

        {/* Payment Methods List */}
        {fundingSources.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Linked accounts</Text>
            {fundingSources.map((source) => (
              <View key={source.id} style={styles.methodCard}>
                <View style={styles.methodInfo}>
                  <View style={styles.methodIcon}>
                    <MaterialCommunityIcons
                      name={getIcon(source.type)}
                      size={24}
                      color={colors.textPrimary}
                    />
                  </View>
                  <View style={styles.methodDetails}>
                    <Text style={styles.methodName}>
                      {source.institution_name || 'Bank Account'}
                    </Text>
                    <Text style={styles.methodNumber}>••••{source.last4}</Text>
                  </View>
                  {source.id === defaultFundingSourceId && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultText}>Default</Text>
                    </View>
                  )}
                </View>

                <View style={styles.methodActions}>
                  {source.id !== defaultFundingSourceId && (
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleSetDefault(source.id)}
                    >
                      <Text style={styles.actionButtonText}>Set as default</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={[styles.actionButton, styles.removeButton]}
                    onPress={() => handleRemove(source)}
                  >
                    <Ionicons name="trash-outline" size={16} color={colors.error} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <MaterialCommunityIcons name="bank-off-outline" size={48} color={colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>No payment methods</Text>
            <Text style={styles.emptyText}>
              Link a bank account to start investing. Your funds will only be debited when you
              confirm an investment.
            </Text>
          </View>
        )}

        {/* Add Method Section */}
        <View style={styles.addSection}>
          <Text style={styles.sectionTitle}>Add payment method</Text>

          <TouchableOpacity
            style={styles.addMethodCard}
            onPress={handleAddMethod}
            disabled={isAddingMethod}
          >
            <View style={styles.addMethodIcon}>
              <MaterialCommunityIcons name="bank-plus" size={28} color={colors.primary} />
            </View>
            <View style={styles.addMethodInfo}>
              <Text style={styles.addMethodTitle}>Link bank account</Text>
              <Text style={styles.addMethodSubtitle}>
                Connect securely via Plaid
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.addMethodCard, styles.disabledCard]} disabled>
            <View style={styles.addMethodIcon}>
              <Ionicons name="card-outline" size={28} color={colors.textMuted} />
            </View>
            <View style={styles.addMethodInfo}>
              <Text style={[styles.addMethodTitle, styles.disabledText]}>Add debit card</Text>
              <Text style={styles.addMethodSubtitle}>Coming soon</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How payments work</Text>
          <View style={styles.infoItem}>
            <View style={styles.infoNumber}>
              <Text style={styles.infoNumberText}>1</Text>
            </View>
            <Text style={styles.infoItemText}>
              Link your bank account securely through Plaid
            </Text>
          </View>
          <View style={styles.infoItem}>
            <View style={styles.infoNumber}>
              <Text style={styles.infoNumberText}>2</Text>
            </View>
            <Text style={styles.infoItemText}>
              When you invest, we initiate an ACH transfer from your account
            </Text>
          </View>
          <View style={styles.infoItem}>
            <View style={styles.infoNumber}>
              <Text style={styles.infoNumberText}>3</Text>
            </View>
            <Text style={styles.infoItemText}>
              Transfers typically take 3-5 business days to complete
            </Text>
          </View>
        </View>

        <View style={{ height: spacing.xxxl }} />
      </ScrollView>

      {/* Loading Overlay */}
      {isAddingMethod && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingCard}>
            <Ionicons name="sync" size={32} color={colors.primary} />
            <Text style={styles.loadingText}>Connecting to your bank...</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.success + '15',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  infoText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
  methodCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  methodDetails: {
    flex: 1,
  },
  methodName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  methodNumber: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  defaultBadge: {
    backgroundColor: colors.primary + '15',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  defaultText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.primary,
  },
  methodActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: spacing.md,
  },
  actionButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  actionButtonText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: '500',
  },
  removeButton: {
    paddingHorizontal: spacing.sm,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: spacing.xl,
  },
  addSection: {
    marginBottom: spacing.xl,
  },
  addMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  disabledCard: {
    opacity: 0.6,
  },
  addMethodIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  addMethodInfo: {
    flex: 1,
  },
  addMethodTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  addMethodSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  disabledText: {
    color: colors.textMuted,
  },
  infoSection: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  infoTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  infoNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  infoNumberText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.white,
  },
  infoItemText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
  },
  loadingText: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
    fontWeight: '500',
  },
});
