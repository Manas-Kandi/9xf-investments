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

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using the 9xf platform ("Service"), you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, do not use our Service.

These Terms constitute a legally binding agreement between you and 9xf Labs, Inc. ("9xf," "we," "us," or "our"). We reserve the right to modify these Terms at any time. Your continued use of the Service after any changes indicates your acceptance of the modified Terms.`,
  },
  {
    title: '2. Eligibility',
    content: `To use our Service, you must:

• Be at least 18 years of age
• Be a legal resident of the United States
• Have a valid Social Security Number
• Complete our identity verification process
• Not be prohibited from investing under applicable law

By using our Service, you represent and warrant that you meet all eligibility requirements.`,
  },
  {
    title: '3. Account Registration',
    content: `You must create an account to use our investment services. You agree to:

• Provide accurate, current, and complete information
• Maintain and update your information as needed
• Keep your login credentials secure and confidential
• Notify us immediately of any unauthorized access
• Accept responsibility for all activity under your account

We may suspend or terminate your account if you violate these Terms or provide false information.`,
  },
  {
    title: '4. Investment Services',
    content: `Our platform facilitates investments in private companies through various investment vehicles. You understand that:

• We are not a registered investment advisor or broker-dealer
• We do not provide investment advice or recommendations
• All investment decisions are made solely by you
• Investments involve significant risk of loss
• Past performance does not guarantee future results

You should consult with your own financial, legal, and tax advisors before making any investment decisions.`,
  },
  {
    title: '5. Investment Risks',
    content: `Investing in private companies is highly speculative and involves substantial risks, including:

• Total loss of your investment
• Illiquidity for extended periods (5-10+ years)
• Dilution of your ownership
• Limited information and transparency
• No guaranteed returns

You should only invest amounts you can afford to lose entirely. Please review our Risk Disclosure for a full description of investment risks.`,
  },
  {
    title: '6. Fees and Payments',
    content: `You agree to pay all fees associated with your use of the Service:

• Transaction fees: Disclosed at time of investment
• Platform fees: As specified in your investment documentation
• Third-party fees: Bank transfer fees, etc.

All fees are non-refundable unless otherwise stated. We may modify our fee structure with advance notice.`,
  },
  {
    title: '7. Prohibited Activities',
    content: `You agree not to:

• Violate any applicable laws or regulations
• Provide false or misleading information
• Attempt to circumvent investment limits
• Access accounts belonging to others
• Interfere with the operation of our Service
• Use our Service for money laundering or illegal purposes
• Reverse engineer or copy our platform
• Engage in any fraudulent activity

Violation of these prohibitions may result in immediate termination and legal action.`,
  },
  {
    title: '8. Intellectual Property',
    content: `All content on our platform, including text, graphics, logos, and software, is the property of 9xf Labs or its licensors and is protected by intellectual property laws.

You may not reproduce, distribute, modify, or create derivative works from our content without our express written permission.`,
  },
  {
    title: '9. Disclaimers',
    content: `THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

We do not guarantee the accuracy, completeness, or usefulness of any information on our platform. Investment opportunities are presented for informational purposes only.`,
  },
  {
    title: '10. Limitation of Liability',
    content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, 9XF SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE.

OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT OF FEES YOU PAID TO US IN THE TWELVE MONTHS PRECEDING THE CLAIM.

These limitations apply regardless of the theory of liability and even if we have been advised of the possibility of such damages.`,
  },
  {
    title: '11. Indemnification',
    content: `You agree to indemnify, defend, and hold harmless 9xf Labs and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from:

• Your use of the Service
• Your violation of these Terms
• Your violation of any third-party rights
• Your investment activities through our platform`,
  },
  {
    title: '12. Dispute Resolution',
    content: `Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration in accordance with the American Arbitration Association rules.

You agree to waive your right to a jury trial and to participate in any class action lawsuit against 9xf Labs.

Arbitration shall take place in San Francisco, California, and the arbitrator's decision shall be final and binding.`,
  },
  {
    title: '13. Governing Law',
    content: `These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.`,
  },
  {
    title: '14. Contact Information',
    content: `If you have questions about these Terms, please contact us:

9xf Labs, Inc.
Email: legal@9xf.com
Address: 123 Innovation Way, San Francisco, CA 94105`,
  },
];

export default function TermsOfUseScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Use</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Introduction */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Terms of Use Agreement</Text>
          <Text style={styles.introText}>
            Please read these Terms of Use carefully before using the 9xf investment platform.
            These terms govern your use of our services and your relationship with us.
          </Text>
          <View style={styles.effectiveContainer}>
            <Text style={styles.effectiveLabel}>Effective Date:</Text>
            <Text style={styles.effectiveDate}>January 1, 2024</Text>
          </View>
        </View>

        {/* Sections */}
        {SECTIONS.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By using 9xf, you acknowledge that you have read, understood, and agree to be bound by
            these Terms of Use.
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
  introSection: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginBottom: spacing.xl,
  },
  introTitle: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  introText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  effectiveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  effectiveLabel: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  effectiveDate: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  sectionContent: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: spacing.xl,
    marginTop: spacing.lg,
  },
  footerText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  lastUpdated: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
});
