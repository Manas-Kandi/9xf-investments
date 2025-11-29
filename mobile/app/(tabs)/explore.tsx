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
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { mockCampaigns, getLiveCampaigns, getUpcomingCampaigns } from '../../data/mockData';
import type { Campaign } from '../../types';

type FilterType = 'all' | 'live' | 'coming_soon' | 'closed';
type SortType = 'newest' | 'most_funded' | 'closing_soon' | 'min_investment';

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'live', label: 'Live' },
  { key: 'coming_soon', label: 'Coming Soon' },
  { key: 'closed', label: 'Closed' },
];

const SORT_OPTIONS: { key: SortType; label: string }[] = [
  { key: 'newest', label: 'Newest' },
  { key: 'most_funded', label: 'Most Funded' },
  { key: 'closing_soon', label: 'Closing Soon' },
  { key: 'min_investment', label: 'Min Investment' },
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
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const filteredCampaigns = useMemo(() => {
    let campaigns = [...mockCampaigns];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      campaigns = campaigns.filter(
        (c) =>
          c.company_name.toLowerCase().includes(query) ||
          c.tagline.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    switch (activeFilter) {
      case 'live':
        campaigns = campaigns.filter((c) => c.status === 'live');
        break;
      case 'coming_soon':
        campaigns = campaigns.filter((c) => c.status === 'draft');
        break;
      case 'closed':
        campaigns = campaigns.filter((c) => c.status === 'closed' || c.status === 'paused');
        break;
    }

    // Apply sorting
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

    return (
      <TouchableOpacity
        key={campaign.id}
        style={styles.campaignCard}
        onPress={() => router.push(`/deal/${campaign.slug}`)}
        activeOpacity={0.7}
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
              { backgroundColor: isLive ? colors.success + '20' : colors.textMuted + '20' },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: isLive ? colors.success : colors.textMuted },
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
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.raised}>${(campaign.amount_raised / 1000).toFixed(0)}k raised</Text>
            <Text style={styles.goal}>${(campaign.target_amount / 1000).toFixed(0)}k goal</Text>
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
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + spacing.md },
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            progressBackgroundColor={colors.surface}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headline}>Explore</Text>
          <Text style={styles.subtitle}>{filteredCampaigns.length} opportunities</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search companies..."
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

        {/* Filter Chips */}
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

          {/* Sort Button */}
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setShowSortMenu(!showSortMenu)}
          >
            <MaterialCommunityIcons name="sort" size={18} color={colors.textSecondary} />
            <Text style={styles.sortButtonText}>
              {SORT_OPTIONS.find((s) => s.key === sortBy)?.label}
            </Text>
            <Ionicons
              name={showSortMenu ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </ScrollView>

        {/* Sort Menu Dropdown */}
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
                  <Ionicons name="checkmark" size={18} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Campaign List */}
        <View style={styles.campaignList}>
          {filteredCampaigns.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>No campaigns found</Text>
              <Text style={styles.emptyText}>
                Try adjusting your search or filters
              </Text>
            </View>
          ) : (
            filteredCampaigns.map(renderCampaignCard)
          )}
        </View>

        {/* Bottom padding */}
        <View style={{ height: insets.bottom + 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  header: {
    marginBottom: spacing.lg,
  },
  headline: {
    fontSize: fontSize.xxxl,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  filterChipActive: {
    backgroundColor: colors.primary + '15',
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  filterTextActive: {
    color: colors.primary,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    marginLeft: spacing.sm,
  },
  sortButtonText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  sortMenu: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  sortMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  sortMenuItemActive: {
    backgroundColor: colors.primary + '10',
  },
  sortMenuText: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  sortMenuTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  campaignList: {
    gap: spacing.md,
  },
  campaignCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  logoContainer: {
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
  cardHeaderInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  tagline: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
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
  description: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  vcBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  vcText: {
    fontSize: fontSize.xs,
    color: colors.success,
    fontWeight: '500',
  },
  progressSection: {
    marginBottom: spacing.md,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  raised: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: '600',
  },
  goal: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  cardFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: spacing.md,
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginBottom: 2,
  },
  footerValue: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
