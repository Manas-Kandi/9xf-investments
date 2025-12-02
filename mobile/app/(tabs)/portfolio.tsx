import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing, borderRadius, typography } from '../../constants/theme';
import { PressableScale, FadeIn, SlideUp } from '../../components/animated';
import { useAppStore } from '../../store';

const formatCurrency = (value: number) =>
  `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

const STATUS_LABEL: Record<string, string> = {
  initiated: 'Pending',
  processing: 'In progress',
  confirmed: 'Completed',
  failed: 'Failed',
};

const STATUS_COLOR: Record<string, string> = {
  initiated: colors.warning,
  processing: colors.info,
  confirmed: colors.success,
  failed: colors.error,
};

export default function PortfolioScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { investments } = useAppStore();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  const visibleInvestments = useMemo(
    () =>
      investments.filter((investment) => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        const name = investment.campaign?.company_name?.toLowerCase() ?? '';
        const status = STATUS_LABEL[investment.status]?.toLowerCase() ?? '';
        return name.includes(query) || status.includes(query);
      }),
    [investments, searchQuery]
  );

  const groupedInvestments = useMemo(() => {
    return visibleInvestments.reduce((groups, investment) => {
      const date = new Date(investment.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      if (!groups[date]) groups[date] = [];
      groups[date].push(investment);
      return groups;
    }, {} as Record<string, typeof visibleInvestments>);
  }, [visibleInvestments]);

  const totals = useMemo(() => {
    const totalVolume = investments.reduce((sum, inv) => sum + inv.amount, 0);
    const completed = investments.filter((inv) => inv.status === 'confirmed').length;
    const pending = investments.filter((inv) => inv.status === 'initiated' || inv.status === 'processing').length;
    return { totalVolume, completed, pending };
  }, [investments]);

  if (investments.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top + spacing.lg }]}>
        <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
        <LinearGradient
          colors={[colors.bgCardHigh, colors.bg]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <FadeIn>
          <Text style={styles.pageTitle}>Activity</Text>
        </FadeIn>
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <MaterialCommunityIcons name="receipt-text-outline" size={48} color={colors.textSecondary} />
          </View>
          <Text style={styles.emptyTitle}>No transactions yet</Text>
          <Text style={styles.emptyText}>Your investment history will appear here.</Text>
          <PressableScale
            style={styles.browseButton}
            onPress={() => router.push('/(tabs)/home')}
          >
            <Text style={styles.browseButtonText}>Browse deals</Text>
          </PressableScale>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
      <LinearGradient
        colors={[colors.bgCardHigh, colors.bg]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.lg }]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} />
        }
        showsVerticalScrollIndicator={false}
      >
        <FadeIn>
          <Text style={styles.pageTitle}>Activity</Text>
        </FadeIn>

        <SlideUp delay={30}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Total volume</Text>
              <Text style={styles.statValue}>{formatCurrency(totals.totalVolume)}</Text>
              <Text style={styles.statHint}>All time</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Completed</Text>
              <Text style={styles.statValue}>{totals.completed}</Text>
              <Text style={styles.statHint}>Settled deals</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Pending</Text>
              <Text style={styles.statValue}>{totals.pending}</Text>
              <Text style={styles.statHint}>In flight</Text>
            </View>
          </View>
        </SlideUp>

        <SlideUp delay={60}>
          <View style={styles.searchContainer}>
            <MaterialCommunityIcons name="magnify" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search activity"
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <PressableScale style={styles.filterButton}>
              <MaterialCommunityIcons name="tune-variant" size={18} color={colors.textSecondary} />
            </PressableScale>
          </View>
        </SlideUp>

        {Object.keys(groupedInvestments).length === 0 ? (
          <View style={styles.emptyStateInline}>
            <Text style={styles.emptyTitle}>No matches</Text>
            <Text style={styles.emptyText}>Try a different search.</Text>
          </View>
        ) : (
          Object.entries(groupedInvestments).map(([date, dateInvestments], groupIndex) => (
            <SlideUp key={date} delay={100 + groupIndex * 40}>
              <Text style={styles.dateHeader}>{date}</Text>
              {dateInvestments.map((investment) => (
                <PressableScale
                  key={investment.id}
                  style={styles.transactionCard}
                  onPress={() => router.push(`/deal/${investment.campaign?.slug}`)}
                >
                  <View style={styles.transactionLeft}>
                    <View style={styles.logo}>
                      <Text style={styles.logoText}>{investment.campaign?.company_name?.charAt(0) || '?'}</Text>
                    </View>
                    <View style={styles.transactionInfo}>
                      <Text style={styles.transactionName}>
                        {investment.campaign?.company_name || 'Unknown'}
                      </Text>
                    <View style={styles.transactionMeta}>
                        <View style={[styles.statusBadge, { backgroundColor: STATUS_COLOR[investment.status] + '22' }]}>
                          <Text style={[styles.statusText, { color: STATUS_COLOR[investment.status] }]}>
                            {STATUS_LABEL[investment.status]}
                          </Text>
                        </View>
                        <Text style={styles.actionText}>{investment.status === 'confirmed' ? 'Buy' : 'Processing'}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.transactionRight}>
                    <Text style={styles.transactionAmount}>{formatCurrency(investment.amount)}</Text>
                    <Text style={styles.transactionTime}>
                      {new Date(investment.created_at).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </Text>
                  </View>
                </PressableScale>
              ))}
            </SlideUp>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  pageTitle: {
    ...typography.headlineMedium,
    color: colors.text,
    letterSpacing: -0.25,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  statLabel: {
    ...typography.labelSmall,
    color: colors.textSecondary,
  },
  statValue: {
    ...typography.titleLarge,
    color: colors.text,
  },
  statHint: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgCard,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.bodyLarge,
    color: colors.text,
    padding: 0,
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.bgCardHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateHeader: {
    ...typography.labelMedium,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bgCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.bgCardHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    ...typography.titleMedium,
    color: colors.text,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    ...typography.titleSmall,
    color: colors.text,
    marginBottom: 4,
  },
  transactionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  statusText: {
    ...typography.labelSmall,
    fontWeight: '600',
  },
  actionText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    ...typography.titleSmall,
    color: colors.text,
    marginBottom: 2,
  },
  transactionTime: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    gap: spacing.md,
  },
  emptyStateInline: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
    gap: spacing.xs,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    ...typography.titleLarge,
    color: colors.text,
  },
  emptyText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  browseButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
  },
  browseButtonText: {
    ...typography.labelLarge,
    color: colors.onPrimary,
  },
});
