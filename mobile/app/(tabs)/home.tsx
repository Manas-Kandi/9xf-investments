import { useRouter } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing, radius, typography } from '../../constants/theme';
import { useAppStore } from '../../store';
import { getLiveCampaigns } from '@shared/mock-data';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { investments, user } = useAppStore();
  const campaigns = getLiveCampaigns();

  const portfolioValue = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const firstName = user?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'there';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + spacing.xl, paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <Text style={styles.greeting}>Hi {firstName}</Text>

        {/* Portfolio Value */}
        <View style={styles.valueSection}>
          <Text style={styles.valueLabel}>Portfolio</Text>
          <Text style={styles.valueAmount}>{formatCurrency(portfolioValue)}</Text>
          {portfolioValue > 0 && (
            <Text style={styles.valueChange}>+4.2% this month</Text>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.actions}>
          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push('/(tabs)/explore')}
          >
            <Text style={styles.primaryButtonText}>Explore deals</Text>
          </Pressable>
          <Pressable
            style={styles.secondaryButton}
            onPress={() => router.push('/account/payment-methods')}
          >
            <Text style={styles.secondaryButtonText}>Add funds</Text>
          </Pressable>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Live Deals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Live</Text>
            <Pressable onPress={() => router.push('/(tabs)/explore')}>
              <Text style={styles.sectionLink}>See all</Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dealsRow}
          >
            {campaigns.slice(0, 5).map((deal) => {
              const progress = Math.round((deal.amount_raised / deal.target_amount) * 100);
              return (
                <Pressable
                  key={deal.id}
                  style={styles.dealCard}
                  onPress={() => router.push(`/deal/${deal.slug}`)}
                >
                  {/* Company Initial */}
                  <View style={styles.dealLogo}>
                    <Text style={styles.dealLogoText}>
                      {deal.company_name.charAt(0)}
                    </Text>
                  </View>

                  {/* Info */}
                  <Text style={styles.dealName} numberOfLines={1}>
                    {deal.company_name}
                  </Text>
                  <Text style={styles.dealTagline} numberOfLines={2}>
                    {deal.tagline}
                  </Text>

                  {/* Progress */}
                  <View style={styles.progressContainer}>
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{progress}%</Text>
                  </View>

                  {/* Min Investment */}
                  <Text style={styles.dealMin}>
                    ${deal.min_investment} min
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{campaigns.length}</Text>
            <Text style={styles.statLabel}>Live deals</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{investments.length}</Text>
            <Text style={styles.statLabel}>Investments</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>$100</Text>
            <Text style={styles.statLabel}>Min invest</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const CARD_WIDTH = SCREEN_WIDTH * 0.6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    paddingHorizontal: spacing.lg,
  },

  // Greeting
  greeting: {
    ...typography.h2,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },

  // Portfolio Value
  valueSection: {
    marginBottom: spacing.xl,
  },
  valueLabel: {
    ...typography.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  valueAmount: {
    ...typography.hero,
    color: colors.text,
  },
  valueChange: {
    ...typography.body,
    color: colors.accent,
    marginTop: spacing.xs,
  },

  // Actions
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
    alignItems: 'center',
  },
  primaryButtonText: {
    ...typography.label,
    color: colors.black,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...typography.label,
    color: colors.text,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.xl,
  },

  // Section
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
  },
  sectionLink: {
    ...typography.label,
    color: colors.accent,
  },

  // Deals
  dealsRow: {
    gap: spacing.md,
  },
  dealCard: {
    width: CARD_WIDTH,
    backgroundColor: colors.bgCard,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  dealLogo: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.bgSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  dealLogoText: {
    ...typography.h2,
    color: colors.text,
  },
  dealName: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  dealTagline: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    minHeight: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: colors.bgSubtle,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  progressText: {
    ...typography.labelSmall,
    color: colors.textSecondary,
    width: 36,
    textAlign: 'right',
  },
  dealMin: {
    ...typography.label,
    color: colors.textMuted,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.bgCard,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...typography.h2,
    color: colors.text,
  },
  statLabel: {
    ...typography.labelSmall,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
});
