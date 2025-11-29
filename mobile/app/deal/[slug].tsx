import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { Button } from '../../components';
import { getCampaignBySlug } from '../../data/mockData';

export default function DealDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const campaign = getCampaignBySlug(slug || '');

  const handleShare = async () => {
    if (!campaign) return;
    
    try {
      const result = await Share.share({
        message: `Check out ${campaign.company_name} on 9xf: ${campaign.tagline}. Invest from just $${campaign.min_investment}!`,
        title: `${campaign.company_name} - Investment Opportunity`,
      });
      
      if (result.action === Share.sharedAction) {
        // Shared successfully
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to share this deal. Please try again.');
    }
  };

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

  const progress = (campaign.amount_raised / campaign.target_amount) * 100;
  const isLive = campaign.status === 'live';

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Company Header */}
        <View style={styles.companyHeader}>
          <View style={styles.logoContainer}>
            {campaign.logo_url ? (
              <Image source={{ uri: campaign.logo_url }} style={styles.logo} />
            ) : (
              <View style={styles.logoPlaceholder}>
                <Text style={styles.logoText}>{campaign.company_name[0]}</Text>
              </View>
            )}
          </View>
          <Text style={styles.companyName}>{campaign.company_name}</Text>
          <Text style={styles.tagline}>{campaign.tagline}</Text>
          
          {campaign.vc_info && (
            <View style={styles.vcBadge}>
              <Ionicons name="shield-checkmark" size={16} color={colors.success} />
              <Text style={styles.vcBadgeText}>Backed by {campaign.vc_info.name}</Text>
            </View>
          )}

          {isLive && (
            <View style={styles.statusChip}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>
                Open until {campaign.close_date ? new Date(campaign.close_date).toLocaleDateString() : 'TBD'}
              </Text>
            </View>
          )}
        </View>

        {/* Key Terms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key terms</Text>
          <View style={styles.termsGrid}>
            {campaign.vc_info && (
              <View style={styles.termItem}>
                <Text style={styles.termLabel}>VC commitment</Text>
                <Text style={styles.termValue}>
                  ${(campaign.vc_info.commitment / 1000).toFixed(0)}k
                </Text>
              </View>
            )}
            <View style={styles.termItem}>
              <Text style={styles.termLabel}>Crowd allocation</Text>
              <Text style={styles.termValue}>
                ${(campaign.target_amount / 1000).toFixed(0)}k
              </Text>
            </View>
            <View style={styles.termItem}>
              <Text style={styles.termLabel}>Instrument</Text>
              <Text style={styles.termValue}>{campaign.instrument || 'SAFE'}</Text>
            </View>
            {campaign.valuation_cap && (
              <View style={styles.termItem}>
                <Text style={styles.termLabel}>Valuation cap</Text>
                <Text style={styles.termValue}>
                  ${(campaign.valuation_cap / 1000000).toFixed(0)}M
                </Text>
              </View>
            )}
            <View style={styles.termItem}>
              <Text style={styles.termLabel}>Minimum investment</Text>
              <Text style={styles.termValue}>${campaign.min_investment}</Text>
            </View>
          </View>
        </View>

        {/* VC Memo */}
        {campaign.vc_memo && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Why {campaign.vc_info?.name || 'the VC'} is investing
            </Text>
            <Text style={styles.memoText}>{campaign.vc_memo}</Text>
            {campaign.vc_reasons && campaign.vc_reasons.length > 0 && (
              <View style={styles.reasonsList}>
                {campaign.vc_reasons.map((reason, index) => (
                  <View key={index} style={styles.reasonItem}>
                    <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                    <Text style={styles.reasonText}>{reason}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Company Story */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What they do</Text>
          <Text style={styles.bodyText}>{campaign.description}</Text>
          
          {campaign.problem && (
            <>
              <Text style={styles.subSectionTitle}>The problem</Text>
              <Text style={styles.bodyText}>{campaign.problem}</Text>
            </>
          )}
          
          {campaign.solution && (
            <>
              <Text style={styles.subSectionTitle}>The solution</Text>
              <Text style={styles.bodyText}>{campaign.solution}</Text>
            </>
          )}
          
          {campaign.traction && (
            <>
              <Text style={styles.subSectionTitle}>Traction</Text>
              <Text style={styles.bodyText}>{campaign.traction}</Text>
            </>
          )}
        </View>

        {/* Progress */}
        {isLive && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Funding progress</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]} />
              </View>
              <View style={styles.progressLabels}>
                <Text style={styles.progressAmount}>
                  ${campaign.amount_raised.toLocaleString()} raised
                </Text>
                <Text style={styles.progressGoal}>
                  of ${campaign.target_amount.toLocaleString()} goal
                </Text>
              </View>
              {campaign.investor_count !== undefined && (
                <Text style={styles.investorCount}>
                  {campaign.investor_count} investors
                </Text>
              )}
            </View>
          </View>
        )}

        {/* Risk Reminder */}
        <View style={styles.riskBox}>
          <Ionicons name="warning-outline" size={20} color={colors.warning} />
          <Text style={styles.riskText}>
            This is a high-risk investment. You could lose all the money you invest.
          </Text>
          <TouchableOpacity>
            <Text style={styles.riskLink}>Read full risks</Text>
          </TouchableOpacity>
        </View>

        {/* FAQ */}
        {campaign.faqs && campaign.faqs.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>FAQ</Text>
            {campaign.faqs.map((faq, index) => (
              <View key={index} style={styles.faqItem}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Spacer for bottom bar */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomBarContent}>
          <Text style={styles.minInvestText}>Minimum ${campaign.min_investment}</Text>
          <Button
            title={isLive ? 'Invest' : 'Coming soon'}
            onPress={() => router.push(`/invest/${campaign.slug}`)}
            disabled={!isLive}
            size="lg"
          />
        </View>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
  },
  shareButton: {
    padding: spacing.sm,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  companyHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
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
    fontSize: fontSize.xxxl,
    fontWeight: '700',
  },
  companyName: {
    fontSize: fontSize.xxl,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  tagline: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  vcBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.success + '20',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    marginBottom: spacing.sm,
  },
  vcBadgeText: {
    color: colors.success,
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  statusText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
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
  subSectionTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  termsGrid: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },
  termItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  termLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  termValue: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  memoText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  reasonsList: {
    gap: spacing.sm,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  reasonText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  bodyText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  progressContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  progressAmount: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.primary,
  },
  progressGoal: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  investorCount: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  riskBox: {
    backgroundColor: colors.warning + '15',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  riskText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  riskLink: {
    fontSize: fontSize.sm,
    color: colors.link,
    fontWeight: '500',
  },
  faqItem: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  faqQuestion: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  faqAnswer: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
  },
  bottomBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  minInvestText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
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
