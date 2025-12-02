import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { colors, spacing, borderRadius, typography } from '../../constants/theme';
import { PressableScale, FadeIn, SlideUp } from '../../components/animated';
import { 
  Surface, 
  FilledCard, 
  OutlinedCard,
  FilledButton, 
  OutlinedButton,
  FilterChip,
  Avatar,
  StatusBadge,
  ProgressBar,
  IconButton,
} from '../../components/ui';
import { useAppStore } from '../../store';
import { getLiveCampaigns } from '@shared/mock-data';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const formatCurrency = (value: number) =>
  `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

function SparkLine({
  data,
  color = colors.primary,
  width = 92,
  height = 34,
}: {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / range) * height * 0.82 - height * 0.09,
  }));

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const cp1x = points[i - 1].x + (points[i].x - points[i - 1].x) / 3;
    const cp2x = points[i - 1].x + ((points[i].x - points[i - 1].x) * 2) / 3;
    path += ` C ${cp1x} ${points[i - 1].y}, ${cp2x} ${points[i].y}, ${points[i].x} ${points[i].y}`;
  }

  return (
    <Svg width={width} height={height}>
      <Path d={path} stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
    </Svg>
  );
}

type FilterKey = 'featured' | 'live' | 'vc' | 'closing';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { investments, user } = useAppStore();
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterKey>('featured');
  const campaigns = getLiveCampaigns();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  const portfolioValue = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const completedInvestments = investments.filter((inv) => inv.status === 'confirmed');
  const hasInvestments = investments.length > 0;

  const filteredCampaigns = useMemo(() => {
    switch (activeFilter) {
      case 'live':
        return campaigns.filter((c) => c.status === 'live');
      case 'vc':
        return campaigns.filter((c) => !!c.vc_info);
      case 'closing':
        return [...campaigns].sort((a, b) => {
          if (!a.close_date) return 1;
          if (!b.close_date) return -1;
          return new Date(a.close_date).getTime() - new Date(b.close_date).getTime();
        });
      default:
        return [...campaigns].sort((a, b) => b.amount_raised - a.amount_raised);
    }
  }, [activeFilter, campaigns]);

  const momentumData = [10000, 11250, 11800, 12500, 13250, 12900, 14150, 15320, 16250, 17500];

  const filters: { key: FilterKey; label: string; icon: keyof typeof MaterialCommunityIcons.glyphMap }[] = [
    { key: 'featured', label: 'Featured', icon: 'star-four-points' },
    { key: 'live', label: 'Live now', icon: 'lightning-bolt' },
    { key: 'vc', label: 'VC-backed', icon: 'shield-check' },
    { key: 'closing', label: 'Closing soon', icon: 'clock-outline' },
  ];

  const metrics = [
    {
      label: hasInvestments ? 'Invested' : 'Target',
      value: hasInvestments ? formatCurrency(portfolioValue) : '$25k',
    },
    {
      label: 'Deals',
      value: hasInvestments ? `${completedInvestments.length}` : `${campaigns.length}`,
    },
    {
      label: 'Available',
      value: hasInvestments ? '$7.5k' : '$5k',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + 120 },
        ]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <FadeIn>
          <View style={styles.header}>
            <Avatar name={user?.full_name || user?.email || 'U'} size="md" />
            <View style={styles.headerContent}>
              <Text style={styles.greeting}>
                Hi, {user?.full_name || user?.email?.split('@')[0] || 'investor'}
              </Text>
              <Text style={styles.subhead}>Build your portfolio</Text>
            </View>
            <View style={styles.headerActions}>
              <IconButton icon="bell-outline" onPress={() => {}} />
              <IconButton icon="cog-outline" onPress={() => router.push('/account')} />
            </View>
          </View>
        </FadeIn>

        {/* Hero Card */}
        <SlideUp delay={40}>
          <Surface elevation={2} rounded="xl" style={styles.heroCard}>
            <View style={styles.heroHeader}>
              <View>
                <Text style={styles.heroLabel}>
                  {hasInvestments ? 'Portfolio value' : 'Getting started'}
                </Text>
                <Text style={styles.heroValue}>
                  {hasInvestments ? formatCurrency(portfolioValue) : '$0'}
                </Text>
              </View>
              <StatusBadge status="success" label="Active" />
            </View>

            <View style={styles.heroStats}>
              {metrics.map((metric) => (
                <View key={metric.label} style={styles.heroStat}>
                  <Text style={styles.heroStatLabel}>{metric.label}</Text>
                  <Text style={styles.heroStatValue}>{metric.value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.heroActions}>
              <FilledButton onPress={() => router.push('/account/payment-methods')}>
                Add funds
              </FilledButton>
              <OutlinedButton onPress={() => router.push('/(tabs)/explore')}>
                Explore
              </OutlinedButton>
            </View>
          </Surface>
        </SlideUp>

        {/* Filter Chips */}
        <SlideUp delay={80}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContainer}
          >
            {filters.map((filter) => (
              <FilterChip
                key={filter.key}
                label={filter.label}
                icon={filter.icon}
                selected={activeFilter === filter.key}
                onPress={() => setActiveFilter(filter.key)}
              />
            ))}
          </ScrollView>
        </SlideUp>

        {/* Live Rounds Section */}
        <SlideUp delay={120}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Live rounds</Text>
            <PressableScale onPress={() => router.push('/(tabs)/explore')}>
              <Text style={styles.sectionLink}>See all</Text>
            </PressableScale>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsRow}
          >
            {filteredCampaigns.slice(0, 6).map((campaign) => {
              const progress = Math.min((campaign.amount_raised / campaign.target_amount) * 100, 100);
              return (
                <OutlinedCard
                  key={campaign.id}
                  style={styles.dealCard}
                  onPress={() => router.push(`/deal/${campaign.slug}`)}
                >
                  <View style={styles.dealHeader}>
                    <Avatar name={campaign.company_name} size="md" />
                    <View style={styles.dealInfo}>
                      <Text style={styles.company}>{campaign.company_name}</Text>
                      <Text style={styles.tagline} numberOfLines={1}>
                        {campaign.tagline}
                      </Text>
                    </View>
                  </View>

                  <ProgressBar progress={progress} height={4} style={styles.dealProgress} />
                  <Text style={styles.progressLabel}>{progress.toFixed(0)}% funded</Text>

                  <View style={styles.dealStats}>
                    <View style={styles.dealStat}>
                      <Text style={styles.statLabel}>Min</Text>
                      <Text style={styles.statValue}>${campaign.min_investment}</Text>
                    </View>
                    <View style={styles.dealStat}>
                      <Text style={styles.statLabel}>Target</Text>
                      <Text style={styles.statValue}>${(campaign.target_amount / 1000).toFixed(0)}k</Text>
                    </View>
                  </View>

                  {campaign.vc_info && (
                    <StatusBadge status="info" label="VC-backed" style={styles.vcBadge} />
                  )}
                </OutlinedCard>
              );
            })}
          </ScrollView>
        </SlideUp>

        {/* Market Pulse */}
        <SlideUp delay={160}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Market pulse</Text>
            <PressableScale onPress={() => router.push('/(tabs)/portfolio')}>
              <Text style={styles.sectionLink}>Activity</Text>
            </PressableScale>
          </View>

          <FilledCard style={styles.pulseCard}>
            <View style={styles.pulseHeader}>
              <StatusBadge status="success" label="Live" />
              <Text style={styles.pulseTitle}>Momentum index</Text>
            </View>
            <View style={styles.pulseContent}>
              <View style={styles.pulseStats}>
                <View>
                  <Text style={styles.pulseStatLabel}>10d change</Text>
                  <Text style={[styles.pulseStatValue, { color: colors.primary }]}>+12.8%</Text>
                </View>
                <View>
                  <Text style={styles.pulseStatLabel}>Volatility</Text>
                  <Text style={styles.pulseStatValue}>Low</Text>
                </View>
              </View>
              <SparkLine data={momentumData} color={colors.primary} width={100} height={40} />
            </View>
          </FilledCard>
        </SlideUp>
      </ScrollView>
    </View>
  );
}

const CARD_WIDTH = Math.min(260, SCREEN_WIDTH * 0.7);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    ...typography.titleMedium,
    color: colors.textPrimary,
  },
  subhead: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },

  // Hero Card
  heroCard: {
    padding: spacing.lg,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  heroLabel: {
    ...typography.labelSmall,
    color: colors.textSecondary,
  },
  heroValue: {
    ...typography.headlineLarge,
    color: colors.textPrimary,
    marginTop: spacing.xxs,
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  heroStat: {
    alignItems: 'center',
  },
  heroStatLabel: {
    ...typography.labelSmall,
    color: colors.textSecondary,
  },
  heroStatValue: {
    ...typography.titleMedium,
    color: colors.textPrimary,
    marginTop: spacing.xxs,
  },
  heroActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },

  // Filters
  filtersContainer: {
    gap: spacing.sm,
  },

  // Section
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    ...typography.titleMedium,
    color: colors.textPrimary,
  },
  sectionLink: {
    ...typography.labelMedium,
    color: colors.primary,
  },

  // Deal Cards
  cardsRow: {
    gap: spacing.md,
    paddingRight: spacing.lg,
  },
  dealCard: {
    width: CARD_WIDTH,
  },
  dealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  dealInfo: {
    flex: 1,
  },
  company: {
    ...typography.titleSmall,
    color: colors.textPrimary,
  },
  tagline: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 2,
  },
  dealProgress: {
    marginBottom: spacing.xs,
  },
  progressLabel: {
    ...typography.labelSmall,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  dealStats: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.sm,
  },
  dealStat: {},
  statLabel: {
    ...typography.labelSmall,
    color: colors.textSecondary,
  },
  statValue: {
    ...typography.titleSmall,
    color: colors.textPrimary,
    marginTop: 2,
  },
  vcBadge: {
    alignSelf: 'flex-start',
  },

  // Pulse Card
  pulseCard: {},
  pulseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  pulseTitle: {
    ...typography.titleMedium,
    color: colors.textPrimary,
  },
  pulseContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  pulseStats: {
    gap: spacing.sm,
  },
  pulseStatLabel: {
    ...typography.labelSmall,
    color: colors.textSecondary,
  },
  pulseStatValue: {
    ...typography.titleSmall,
    color: colors.textPrimary,
    marginTop: 2,
  },
});
