import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../constants/theme';

const RISKS = [
  {
    title: 'Loss of Investment',
    content:
      'Investing in startups is highly speculative and involves significant risk of loss. Most startups fail, and you may lose all of your investment. You should only invest amounts that you can afford to lose entirely without affecting your lifestyle.',
  },
  {
    title: 'Illiquidity',
    content:
      'Investments in private companies are highly illiquid. Unlike public stocks, there is no established market where you can sell your investment. You may not be able to sell your investment for 5-10 years or more, and there is no guarantee you will ever be able to sell.',
  },
  {
    title: 'Dilution',
    content:
      'If the company raises additional funding, your ownership percentage may be diluted. Future investors may receive preferential terms that reduce the value of your investment. The company may issue additional shares that reduce your proportional ownership.',
  },
  {
    title: 'Lack of Information',
    content:
      'Private companies have limited disclosure requirements compared to public companies. You may receive little to no information about the company\'s financial performance after your investment. The information provided may be incomplete or not independently verified.',
  },
  {
    title: 'No Voting Rights',
    content:
      'Your investment may be held through a pooled vehicle (SPV) that has limited or no voting rights in the company. Decisions about the company\'s direction will be made without your input. You may have no ability to influence major corporate decisions.',
  },
  {
    title: 'Valuation Risk',
    content:
      'The valuation of early-stage companies is inherently subjective and may not reflect the actual value of the company. There is no guarantee that the company will be worth its current valuation in the future. The company may never achieve the growth necessary to justify its valuation.',
  },
  {
    title: 'Regulatory Risk',
    content:
      'The legal and regulatory environment for startups is complex and constantly evolving. Changes in regulations could negatively impact the company\'s business or the ability to sell your investment. Compliance failures could result in fines, penalties, or business closure.',
  },
  {
    title: 'Key Person Risk',
    content:
      'Early-stage companies often depend heavily on a small number of key individuals. The departure of founders or key employees could significantly impact the company\'s prospects. There is no guarantee that the company will be able to retain key personnel.',
  },
  {
    title: 'Market Risk',
    content:
      'The market for the company\'s products or services may change. Competition may increase, customer preferences may shift, or new technologies may emerge that make the company\'s offerings obsolete. Economic downturns may reduce demand for the company\'s products.',
  },
  {
    title: 'No Guarantee of Returns',
    content:
      'There is no guarantee that you will receive any return on your investment. Past performance of other investments or companies is not indicative of future results. The success stories you may hear represent a small minority of outcomes.',
  },
];

export default function RiskDisclosureScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Risk Disclosure</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Warning Banner */}
        <View style={styles.warningBanner}>
          <Ionicons name="warning" size={32} color={colors.warning} />
          <Text style={styles.warningTitle}>Important Risk Information</Text>
          <Text style={styles.warningText}>
            Please read this document carefully before investing. Investing in startups involves
            significant risk and should only be done with money you can afford to lose.
          </Text>
        </View>

        {/* Introduction */}
        <View style={styles.section}>
          <Text style={styles.introText}>
            9xf labs provides access to investments in early-stage private companies. These
            investments carry substantial risks that differ from traditional investments like stocks
            and bonds. By investing through our platform, you acknowledge that you understand and
            accept these risks.
          </Text>
        </View>

        {/* Risk Categories */}
        {RISKS.map((risk, index) => (
          <View key={index} style={styles.riskCard}>
            <View style={styles.riskHeader}>
              <View style={styles.riskNumber}>
                <Text style={styles.riskNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.riskTitle}>{risk.title}</Text>
            </View>
            <Text style={styles.riskContent}>{risk.content}</Text>
          </View>
        ))}

        {/* Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>In Summary</Text>
          <Text style={styles.summaryText}>
            Startup investing is not suitable for everyone. Before investing, consider:
          </Text>
          <View style={styles.summaryList}>
            <Text style={styles.summaryItem}>• Can you afford to lose this money entirely?</Text>
            <Text style={styles.summaryItem}>
              • Are you comfortable with a 5-10+ year investment horizon?
            </Text>
            <Text style={styles.summaryItem}>
              • Do you understand that most startups fail?
            </Text>
            <Text style={styles.summaryItem}>
              • Have you diversified your investments appropriately?
            </Text>
          </View>
          <Text style={styles.summaryFooter}>
            If you answered "no" to any of these questions, startup investing may not be right for
            you at this time.
          </Text>
        </View>

        {/* Legal Footer */}
        <View style={styles.legalSection}>
          <Text style={styles.legalText}>
            This risk disclosure is provided for informational purposes only and does not constitute
            investment advice. 9xf labs is not a registered investment advisor or broker-dealer. We
            do not provide personalized investment recommendations.
          </Text>
          <Text style={styles.legalText}>
            Securities offered through our platform are offered pursuant to applicable exemptions
            from registration under the Securities Act of 1933. Past performance is not indicative
            of future results.
          </Text>
          <Text style={styles.lastUpdated}>Last updated: January 2024</Text>
        </View>

        <View style={{ height: spacing.xxxl }} />
      </ScrollView>
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
  warningBanner: {
    backgroundColor: colors.warning + '15',
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.warning + '30',
  },
  warningTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  warningText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: spacing.xl,
  },
  introText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  riskCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  riskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  riskNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  riskNumberText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.white,
  },
  riskTitle: {
    flex: 1,
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  riskContent: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  summaryCard: {
    backgroundColor: colors.primary + '10',
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.primary + '20',
  },
  summaryTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  summaryText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  summaryList: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  summaryItem: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  summaryFooter: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  legalSection: {
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: spacing.xl,
  },
  legalText: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  lastUpdated: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
});
