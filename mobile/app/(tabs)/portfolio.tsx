import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { Button } from '../../components';
import { useAppStore } from '../../store';

export default function PortfolioScreen() {
  const router = useRouter();
  const { investments } = useAppStore();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const companiesCount = new Set(investments.map((i) => i.campaign_id)).size;

  const statusLabel: Record<string, string> = {
    initiated: 'Pending',
    processing: 'Processing',
    confirmed: 'Confirmed',
    failed: 'Failed',
  };

  const statusColor: Record<string, string> = {
    initiated: colors.warning,
    processing: colors.info,
    confirmed: colors.success,
    failed: colors.error,
  };

  if (investments.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Ionicons name="briefcase-outline" size={48} color={colors.textMuted} />
          </View>
          <Text style={styles.emptyTitle}>No investments yet</Text>
          <Text style={styles.emptyText}>
            When you invest, they'll appear here.
          </Text>
          <Button
            title="Browse deals"
            onPress={() => router.push('/(tabs)/home')}
            variant="primary"
            size="lg"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            progressBackgroundColor={colors.surface}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Portfolio</Text>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total invested</Text>
            <Text style={styles.summaryValue}>${totalInvested.toLocaleString()}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Companies</Text>
            <Text style={styles.summaryValue}>{companiesCount}</Text>
          </View>
        </View>

        {/* Investments List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your investments</Text>
          {investments.map((investment) => (
            <TouchableOpacity
              key={investment.id}
              style={styles.investmentCard}
              onPress={() => router.push(`/deal/${investment.campaign?.slug}`)}
            >
              <View style={styles.investmentHeader}>
                <View style={styles.companyLogo}>
                  <Text style={styles.logoText}>
                    {investment.campaign?.company_name?.charAt(0) || '?'}
                  </Text>
                </View>
                <View style={styles.companyInfo}>
                  <Text style={styles.companyName}>
                    {investment.campaign?.company_name || 'Unknown Company'}
                  </Text>
                  <Text style={styles.investmentDate}>
                    Invested on {new Date(investment.created_at).toLocaleDateString()}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: statusColor[investment.status] + '20' },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: statusColor[investment.status] },
                    ]}
                  >
                    {statusLabel[investment.status]}
                  </Text>
                </View>
              </View>
              <View style={styles.investmentFooter}>
                <View>
                  <Text style={styles.amountLabel}>Amount invested</Text>
                  <Text style={styles.amountValue}>
                    ${investment.amount.toLocaleString()}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.textMuted}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  summaryValue: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  investmentCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  investmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  logoText: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  investmentDate: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  investmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  amountLabel: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  amountValue: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
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
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
});
