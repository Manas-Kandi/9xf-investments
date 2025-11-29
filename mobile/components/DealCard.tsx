import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius, shadows } from '../constants/theme';
import { useComponentTokens } from '../design-system';
import type { Campaign } from '../types';

interface DealCardProps {
  campaign: Campaign;
  onPress: () => void;
  featured?: boolean;
}

export function DealCard({ campaign, onPress, featured = false }: DealCardProps) {
  const cardSpec = useComponentTokens('card');
  const progress = (campaign.amount_raised / campaign.target_amount) * 100;
  const isLive = campaign.status === 'live';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderRadius: cardSpec.radius,
          padding: cardSpec.padding,
          backgroundColor: featured ? cardSpec.elevatedBackground : cardSpec.background,
          borderColor: featured ? colors.primary : cardSpec.border,
        },
        featured && styles.featured,
        shadows.md,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Header with logo and VC badge */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          {campaign.logo_url ? (
            <Image source={{ uri: campaign.logo_url }} style={styles.logo} />
          ) : (
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>{campaign.company_name[0]}</Text>
            </View>
          )}
        </View>
        
        {isLive && (
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Raising now</Text>
          </View>
        )}
        
        {!isLive && campaign.status === 'draft' && (
          <View style={styles.comingSoonBadge}>
            <Text style={styles.comingSoonText}>Coming soon</Text>
          </View>
        )}
      </View>

      {/* Company info */}
      <Text style={styles.companyName}>{campaign.company_name}</Text>
      <Text style={styles.tagline} numberOfLines={2}>{campaign.tagline}</Text>

      {/* VC info */}
      {campaign.vc_info && (
        <View style={styles.vcInfo}>
          <Ionicons name="shield-checkmark" size={14} color={colors.success} />
          <Text style={styles.vcText}>Backed by {campaign.vc_info.name}</Text>
        </View>
      )}

      {/* Progress bar (only for live campaigns) */}
      {isLive && (
        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.raisedAmount}>
              ${campaign.amount_raised.toLocaleString()} raised
            </Text>
            <Text style={styles.goalAmount}>
              {Math.round(progress)}% of ${(campaign.target_amount / 1000).toFixed(0)}k goal
            </Text>
          </View>
        </View>
      )}

      {/* Key metrics */}
      <View style={styles.metrics}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Min investment</Text>
          <Text style={styles.metricValue}>${campaign.min_investment}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Crowd allocation</Text>
          <Text style={styles.metricValue}>{campaign.crowd_percentage}%</Text>
        </View>
      </View>

      {/* CTA */}
      <View style={styles.cta}>
        <Text style={styles.ctaText}>
          {isLive ? `Invest from $${campaign.min_investment}` : 'Coming soon'}
        </Text>
        <Ionicons name="arrow-forward" size={18} color={colors.textPrimary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  featured: {
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  logoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: colors.white,
    fontSize: fontSize.xl,
    fontWeight: '700',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    gap: spacing.xs,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.white,
  },
  liveText: {
    color: colors.white,
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  comingSoonBadge: {
    backgroundColor: colors.surfaceSecondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  comingSoonText: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
    fontWeight: '500',
  },
  companyName: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  tagline: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  vcInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  vcText: {
    fontSize: fontSize.sm,
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
  raisedAmount: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: '600',
  },
  goalAmount: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  metrics: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginBottom: spacing.lg,
  },
  metric: {
    flex: 1,
  },
  metricLabel: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  metricValue: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceSecondary,
    padding: spacing.md,
    borderRadius: borderRadius.sm,
  },
  ctaText: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
    fontWeight: '500',
  },
});
