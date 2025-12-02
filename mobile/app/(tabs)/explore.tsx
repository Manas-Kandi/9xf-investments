import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing, borderRadius, typography } from '../../constants/theme';
import { getLiveCampaigns, getUpcomingCampaigns, mockCampaigns } from '@shared/mock-data';
import type { Campaign } from '@shared/types';

type FilterType = 'all' | 'live' | 'coming_soon' | 'vc_backed';
type SortType = 'newest' | 'most_funded' | 'closing_soon' | 'min_investment';

const FILTERS: { key: FilterType; label: string; icon: keyof typeof MaterialCommunityIcons.glyphMap }[] = [
  { key: 'all', label: 'All', icon: 'apps' },
  { key: 'live', label: 'Live', icon: 'lightning-bolt' },
  { key: 'coming_soon', label: 'Coming soon', icon: 'clock-outline' },
  { key: 'vc_backed', label: 'VC-backed', icon: 'shield-check' },
];

const SORT_OPTIONS: { key: SortType; label: string }[] = [
  { key: 'newest', label: 'Newest' },
  { key: 'most_funded', label: 'Most funded' },
  { key: 'closing_soon', label: 'Closing soon' },
  { key: 'min_investment', label: 'Min investment' },
];

export default function ExploreScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('newest');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  const stats = useMemo(() => ({
    live: getLiveCampaigns().length,
    upcoming: getUpcomingCampaigns().length,
    backed: mockCampaigns.filter((c) => c.vc_info).length,
  }), []);

  const filteredCampaigns = useMemo(() => {
    let campaigns = [...mockCampaigns];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      campaigns = campaigns.filter(
        (c) =>
          c.company_name.toLowerCase().includes(query) ||
          c.tagline.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query)
      );
    }

    switch (activeFilter) {
      case 'live':
        campaigns = campaigns.filter((c) => c.status === 'live');
        break;
      case 'coming_soon':
        campaigns = campaigns.filter((c) => c.status === 'draft');
        break;
      case 'vc_backed':
        campaigns = campaigns.filter((c) => !!c.vc_info);
        break;
    }

    switch (sortBy) {
      case 'newest':
        campaigns.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'most_funded':
        campaigns.sort((a, b) => b.amount_raised - a.amount_raised);
        break;
      case 'closing_soon':
        campaigns.sort((a, b) => {
          if (!a.close_date) return 1;
          if (!b.close_date) return -1;
          return new Date(a.close_date).getTime() - new Date(b.close_date).getTime();
        });
        break;
      case 'min_investment':
        campaigns.sort((a, b) => a.min_investment - b.min_investment);
        break;
    }

    return campaigns;
  }, [searchQuery, activeFilter, sortBy]);

  const renderCampaignCard = (campaign: Campaign) => {
    const progress = (campaign.amount_raised / campaign.target_amount) * 100;
    const isLive = campaign.status === 'live';
    const isClosed = campaign.status === 'closed' || campaign.status === 'paused';

    return (
      <TouchableOpacity
        key={campaign.id}
        style={styles.campaignCard}
        onPress={() => router.push(`/deal/${campaign.slug}`)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[colors.bgCard, colors.bgCardHigh]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardBackground}
        >
          <View style={styles.cardHeader}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>{campaign.company_name[0]}</Text>
            </View>
            <View style={styles.cardHeaderInfo}>
              <Text style={styles.companyName}>{campaign.company_name}</Text>
              <Text style={styles.tagline} numberOfLines={1}>
                {campaign.tagline}
              </Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: isLive ? colors.accent + '22' : isClosed ? colors.error + '22' : colors.textMuted + '22' },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: isLive ? colors.accent : isClosed ? colors.error : colors.textMuted },
                ]}
              >
                {isLive ? 'Live' : campaign.status === 'draft' ? 'Coming' : 'Closed'}
              </Text>
            </View>
          </View>

          <Text style={styles.description} numberOfLines={2}>
            {campaign.description}
          </Text>

          {campaign.vc_info && (
            <View style={styles.vcBadge}>
              <Ionicons name="shield-checkmark" size={14} color={colors.success} />
              <Text style={styles.vcText}>Backed by {campaign.vc_info.name}</Text>
            </View>
          )}

          <View style={styles.progressSection}>
            <View style={styles.progressLabels}>
              <Text style={styles.raised}>${(campaign.amount_raised / 1000).toFixed(0)}k raised</Text>
              <Text style={styles.goal}>${(campaign.target_amount / 1000).toFixed(0)}k goal</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]} />
            </View>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.footerItem}>
              <Text style={styles.footerLabel}>Min</Text>
              <Text style={styles.footerValue}>${campaign.min_investment}</Text>
            </View>
            <View style={styles.footerItem}>
              <Text style={styles.footerLabel}>Investors</Text>
              <Text style={styles.footerValue}>{campaign.investor_count || 0}</Text>
            </View>
            <View style={styles.footerItem}>
              <Text style={styles.footerLabel}>Instrument</Text>
              <Text style={styles.footerValue}>{campaign.instrument || 'SAFE'}</Text>
            </View>
            <View style={styles.footerCTA}>
              <Text style={styles.footerLink}>View</Text>
              <MaterialCommunityIcons name="chevron-right" size={18} color={colors.textSecondary} />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

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
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xl },
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            progressBackgroundColor={colors.surface}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.headline}>Discover</Text>
            <Text style={styles.subtitle}>{filteredCampaigns.length} opportunities curated for you</Text>
          </View>
          <TouchableOpacity style={styles.sortPill} onPress={() => setShowSortMenu(!showSortMenu)}>
            <MaterialCommunityIcons name="sort" size={18} color={colors.textSecondary} />
            <Text style={styles.sortText}>{SORT_OPTIONS.find((s) => s.key === sortBy)?.label}</Text>
            <Ionicons name={showSortMenu ? 'chevron-up' : 'chevron-down'} size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Live deals</Text>
            <Text style={styles.statValue}>{stats.live}</Text>
            <Text style={styles.statHint}>Investable now</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>VC-backed</Text>
            <Text style={styles.statValue}>{stats.backed}</Text>
            <Text style={styles.statHint}>Trusted partners</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Upcoming</Text>
            <Text style={styles.statValue}>{stats.upcoming}</Text>
            <Text style={styles.statHint}>Get early access</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search companies, industries, or tags"
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterChip,
                activeFilter === filter.key && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(filter.key)}
            >
              <MaterialCommunityIcons
                name={filter.icon}
                size={16}
                color={activeFilter === filter.key ? colors.onPrimary : colors.textSecondary}
              />
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter.key && styles.filterTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {showSortMenu && (
          <View style={styles.sortMenu}>
            {SORT_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.sortMenuItem,
                  sortBy === option.key && styles.sortMenuItemActive,
                ]}
                onPress={() => {
                  setSortBy(option.key);
                  setShowSortMenu(false);
                }}
              >
                <Text
                  style={[
                    styles.sortMenuText,
                    sortBy === option.key && styles.sortMenuTextActive,
                  ]}
                >
                  {option.label}
                </Text>
                {sortBy === option.key && (
                  <Ionicons name="checkmark" size={18} color={colors.accent} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.campaignList}>
          {filteredCampaigns.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>No campaigns found</Text>
              <Text style={styles.emptyText}>Try adjusting your search or filters</Text>
            </View>
          ) : (
            filteredCampaigns.map(renderCampaignCard)
          )}
        </View>
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
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headline: {
    ...typography.headlineMedium,
    color: colors.text,
    letterSpacing: -0.25,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  sortPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.bgCard,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sortText: {
    ...typography.labelMedium,
    color: colors.textSecondary,
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
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 48,
    ...typography.bodyLarge,
    color: colors.text,
  },
  filtersContainer: {
    gap: spacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.bgCard,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  filterText: {
    ...typography.labelMedium,
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.onPrimary,
  },
  sortMenu: {
    backgroundColor: colors.bgCard,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  sortMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sortMenuItemActive: {
    backgroundColor: colors.accent + '14',
  },
  sortMenuText: {
    ...typography.bodyMedium,
    color: colors.text,
  },
  sortMenuTextActive: {
    color: colors.accent,
    fontWeight: '600',
  },
  campaignList: {
    gap: spacing.md,
    paddingBottom: spacing.lg,
  },
  campaignCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardBackground: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.bgCardHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    ...typography.titleMedium,
    color: colors.text,
  },
  cardHeaderInfo: {
    flex: 1,
  },
  companyName: {
    ...typography.titleMedium,
    color: colors.text,
    marginBottom: 2,
  },
  tagline: {
    ...typography.bodySmall,
    color: colors.textSecondary,
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
  description: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  vcBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.bgCardHigh,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  vcText: {
    ...typography.labelSmall,
    color: colors.success,
    fontWeight: '600',
  },
  progressSection: {
    gap: spacing.sm,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  raised: {
    ...typography.bodySmall,
    color: colors.accent,
    fontWeight: '600',
  },
  goal: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.bgCardHigh,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  footerItem: {
    flex: 1,
    gap: 4,
  },
  footerLabel: {
    ...typography.labelSmall,
    color: colors.textSecondary,
  },
  footerValue: {
    ...typography.titleSmall,
    color: colors.text,
  },
  footerCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerLink: {
    ...typography.labelMedium,
    color: colors.accent,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    ...typography.titleLarge,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.bodyMedium,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
