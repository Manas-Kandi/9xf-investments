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
    title: 'Information We Collect',
    content: `We collect information you provide directly to us, including:

• Personal identification information (name, email address, phone number, date of birth, Social Security Number for tax and regulatory purposes)
• Financial information (bank account details, investment history)
• Identity verification documents
• Communications you send to us

We also automatically collect certain information when you use our platform:
• Device information and identifiers
• Log data and usage information
• Location information (with your permission)`,
  },
  {
    title: 'How We Use Your Information',
    content: `We use the information we collect to:

• Process your investment transactions
• Verify your identity and comply with legal requirements
• Communicate with you about your account and investments
• Send you updates about new investment opportunities
• Improve and develop our services
• Prevent fraud and ensure platform security
• Comply with applicable laws and regulations`,
  },
  {
    title: 'Information Sharing',
    content: `We may share your information with:

• Investment partners and portfolio companies (limited information for investor relations)
• Service providers who assist our operations (payment processors, identity verification services)
• Legal and regulatory authorities when required by law
• Professional advisors (lawyers, accountants, auditors)

We do not sell your personal information to third parties for marketing purposes.`,
  },
  {
    title: 'Data Security',
    content: `We implement appropriate technical and organizational measures to protect your personal information, including:

• Encryption of data in transit and at rest
• Regular security assessments and penetration testing
• Access controls and authentication measures
• Employee training on data protection

While we strive to protect your information, no method of transmission over the Internet is 100% secure.`,
  },
  {
    title: 'Your Rights and Choices',
    content: `Depending on your location, you may have certain rights regarding your personal information:

• Access and review your personal information
• Request correction of inaccurate data
• Request deletion of your data (subject to legal retention requirements)
• Opt out of marketing communications
• Export your data in a portable format

To exercise these rights, contact us at privacy@9xf.com`,
  },
  {
    title: 'Data Retention',
    content: `We retain your personal information for as long as necessary to:

• Maintain your account and provide services
• Comply with legal and regulatory requirements
• Resolve disputes and enforce agreements

Investment records are typically retained for at least 7 years after account closure as required by financial regulations.`,
  },
  {
    title: 'Cookies and Tracking',
    content: `Our mobile app uses similar technologies to cookies to:

• Remember your preferences and settings
• Analyze app usage and performance
• Provide personalized content

You can manage these preferences in your device settings.`,
  },
  {
    title: "Children's Privacy",
    content: `Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.`,
  },
  {
    title: 'Changes to This Policy',
    content: `We may update this privacy policy from time to time. We will notify you of material changes by:

• Posting the updated policy in the app
• Sending you an email notification
• Displaying a prominent notice in the app

Your continued use of our services after changes indicates acceptance of the updated policy.`,
  },
  {
    title: 'Contact Us',
    content: `If you have questions about this privacy policy or our data practices, contact us at:

9xf Labs, Inc.
Email: privacy@9xf.com
Address: 123 Innovation Way, San Francisco, CA 94105

For data protection inquiries in the EU, contact our Data Protection Officer at dpo@9xf.com`,
  },
];

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Introduction */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Your Privacy Matters</Text>
          <Text style={styles.introText}>
            At 9xf Labs, we take your privacy seriously. This policy explains how we collect, use,
            and protect your personal information when you use our investment platform.
          </Text>
          <Text style={styles.effectiveDate}>Effective Date: January 1, 2024</Text>
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
            By using 9xf, you agree to this Privacy Policy. If you do not agree, please do not use
            our services.
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
  effectiveDate: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    fontStyle: 'italic',
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
