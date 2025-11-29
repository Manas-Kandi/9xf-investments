import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../constants/theme';
import { color, type } from '../constants/design-system';
import { PressableScale } from './animated';
import type { Campaign } from '@shared/types';

interface DealCardProps {
  campaign: Campaign;
  onPress: () => void;
  featured?: boolean;
}

export function DealCard({ campaign, onPress, featured = false }: DealCardProps) {
  const progress = (campaign.amount_raised / campaign.target_amount) * 100;
  const isLive = campaign.status === 'live';

  return (
    <PressableScale
      style={[styles.container, featured && styles.featured]}
      onPress={onPress}
    >
      {/* Header with logo and status */}
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
            <Text style={styles.liveText}>Live</Text>
          </View>
        )}
        
        {!isLive && campaign.status === 'draft' && (
          <View style={styles.comingSoonBadge}>
            <Text style={styles.comingSoonText}>Soon</Text>
          </View>
        )}
      </View>

      {/* Company info */}
      <Text style={styles.companyName}>{campaign.company_name}</Text>
      <Text style={styles.tagline} numberOfLines={2}>{campaign.tagline}</Text>

      {/* VC info */}
      {campaign.vc_info && (
        <View style={styles.vcInfo}>
          <MaterialCommunityIcons name="shield-check" size={14} color={color.success} />
          <Text style={styles.vcText}>{campaign.vc_info.name}</Text>
        </View>
      )}

      {/* Progress bar */}
      {isLive && (
        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.raisedAmount}>
              ${(campaign.amount_raised / 1000).toFixed(0)}k raised
            </Text>
            <Text style={styles.goalAmount}>
              {Math.round(progress)}%
            </Text>
          </View>
        </View>
      )}

      {/* Key metrics */}
      <View style={styles.metrics}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Min</Text>
          <Text style={styles.metricValue}>${campaign.min_investment}</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Allocation</Text>
          <Text style={styles.metricValue}>{campaign.crowd_percentage}%</Text>
        </View>
      </View>

      {/* CTA */}
      <View style={styles.cta}>
        <Text style={styles.ctaText}>
          {isLive ? 'Invest' : 'Notify me'}
        </Text>
        <MaterialCommunityIcons name="arrow-right" size={16} color={color.bg} />
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.bgCard,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  featured: {
    borderWidth: 1,
    borderColor: color.accent,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  logoContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    overflow: 'hidden',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  logoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: color.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.success,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#fff',
  },
  liveText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  comingSoonBadge: {
    backgroundColor: color.bgElevated,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  comingSoonText: {
    color: color.textSecondary,
    fontSize: 11,
    fontWeight: '500',
  },
  companyName: {
    ...type.titleMedium,
    color: color.textPrimary,
    marginBottom: 4,
  },
  tagline: {
    ...type.bodySmall,
    color: color.textSecondary,
    marginBottom: 12,
    lineHeight: 18,
  },
  vcInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  vcText: {
    ...type.labelSmall,
    color: color.success,
  },
  progressSection: {
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: color.bgElevated,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: color.accent,
    borderRadius: 2,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  raisedAmount: {
    ...type.labelSmall,
    color: color.accent,
  },
  goalAmount: {
    ...type.labelSmall,
    color: color.textSecondary,
  },
  metrics: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  metric: {
    flex: 1,
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: color.borderSubtle,
    marginHorizontal: 16,
  },
  metricLabel: {
    ...type.labelSmall,
    color: color.textSecondary,
    marginBottom: 2,
  },
  metricValue: {
    ...type.titleSmall,
    color: color.textPrimary,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.accent,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  ctaText: {
    ...type.labelMedium,
    color: color.bg,
    fontWeight: '600',
  },
});
