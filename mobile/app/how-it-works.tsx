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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../constants/theme';
import { Button } from '../components';

const STEPS = [
  {
    icon: 'shield-checkmark-outline' as const,
    title: 'Create your account',
    description:
      'Sign up with email or Google/Apple. Complete a simple identity verification (KYC) once. This keeps the platform safe and compliant with regulations.',
  },
  {
    icon: 'card-outline' as const,
    title: 'Link your bank',
    description:
      'Securely connect your bank account. We never store your login credentials. Funds are only moved when you confirm an investment.',
  },
  {
    icon: 'flash-outline' as const,
    title: 'Invest in seconds',
    description:
      "Browse campaigns, pick an amount, and confirm. That's it. After your one-time setup, investing takes just a few taps.",
  },
];

const FAQS = [
  {
    question: 'Who can invest?',
    answer:
      "Anyone 18+ who is a US resident can invest through 9xf. You don't need to be an accredited investor. There are annual limits on how much you can invest based on your income and net worth.",
  },
  {
    question: "What's the minimum investment?",
    answer:
      'Minimums vary by campaign but typically start at $50. Each campaign also has a maximum per-person limit (usually $1,000-$2,500) to ensure broad participation.',
  },
  {
    question: 'How do I make money?',
    answer:
      'If the startup is acquired or goes public, you receive your proportional share of the proceeds. There are no dividends or regular payouts. This is a long-term investment that could take 5-10+ years to see returns, if ever.',
  },
  {
    question: 'Can I sell my investment?',
    answer:
      "These are illiquid investments. You typically cannot sell until there's an exit event (acquisition or IPO). We may offer secondary liquidity options in the future, but this is not guaranteed.",
  },
  {
    question: 'What happens if the startup fails?',
    answer:
      'If the startup fails, you lose your investment. Most startups fail. Only invest what you can afford to lose.',
  },
  {
    question: 'How are startups selected?',
    answer:
      'Every company on 9xf is reviewed by our team. We look for strong founders, clear business models, and reasonable terms. However, our review is not a guarantee of success or endorsement.',
  },
];

export default function HowItWorksScreen() {
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>How it works</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Investing in startups, simplified</Text>
          <Text style={styles.heroSubtitle}>
            One-time setup, then invest in seconds
          </Text>
        </View>

        {/* Steps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Getting started</Text>
          {STEPS.map((step, index) => (
            <View key={index} style={styles.stepCard}>
              <View style={styles.stepIcon}>
                <Ionicons name={step.icon} size={28} color={colors.white} />
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepNumber}>Step {index + 1}</Text>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* What you're buying */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What you're actually buying</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              When you invest through 9xf, you're buying a share of a{' '}
              <Text style={styles.bold}>pooled investment vehicle</Text> (like an SPV or fund) that
              holds equity in the startup. This means:
            </Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  You own a piece of the vehicle, which owns shares in the company
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  All investors are pooled together, keeping the startup's cap table clean
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  If the company is acquired or goes public, proceeds are distributed proportionally
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  There are no dividends or regular payouts—this is a long-term investment
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Risk Warning */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Understanding the risks</Text>
          <View style={styles.riskCard}>
            <View style={styles.riskHeader}>
              <Ionicons name="warning" size={24} color={colors.warning} />
              <Text style={styles.riskTitle}>Startup investing is high-risk</Text>
            </View>
            <Text style={styles.riskText}>
              Most startups fail. You should only invest money you can afford to lose entirely.
            </Text>
            <View style={styles.riskList}>
              <Text style={styles.riskItem}>
                <Text style={styles.bold}>Loss of capital:</Text> You could lose 100% of your
                investment
              </Text>
              <Text style={styles.riskItem}>
                <Text style={styles.bold}>Illiquidity:</Text> You may not be able to sell for 5-10+
                years
              </Text>
              <Text style={styles.riskItem}>
                <Text style={styles.bold}>No guarantees:</Text> Past performance doesn't predict
                future results
              </Text>
              <Text style={styles.riskItem}>
                <Text style={styles.bold}>Limited information:</Text> Startups don't report like
                public companies
              </Text>
            </View>
          </View>
        </View>

        {/* FAQ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently asked questions</Text>
          {FAQS.map((faq, index) => (
            <TouchableOpacity
              key={index}
              style={styles.faqItem}
              onPress={() => setExpandedFaq(expandedFaq === index ? null : index)}
              activeOpacity={0.7}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Ionicons
                  name={expandedFaq === index ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={colors.textSecondary}
                />
              </View>
              {expandedFaq === index && <Text style={styles.faqAnswer}>{faq.answer}</Text>}
            </TouchableOpacity>
          ))}
        </View>

        {/* CTA */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to start investing?</Text>
          <Text style={styles.ctaSubtitle}>
            Browse live campaigns and invest in startups you believe in.
          </Text>
          <Button
            title="Browse campaigns"
            onPress={() => router.push('/(tabs)/explore')}
            size="lg"
            fullWidth
          />
        </View>

        <View style={{ height: spacing.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
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
    color: colors.text,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  heroTitle: {
    fontSize: fontSize.xxl,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  stepIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  stepContent: {
    flex: 1,
  },
  stepNumber: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  stepTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  stepDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  infoText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  bold: {
    fontWeight: '600',
    color: colors.text,
  },
  bulletList: {
    gap: spacing.sm,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginTop: 7,
    marginRight: spacing.sm,
  },
  bulletText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text,
    lineHeight: 20,
  },
  riskCard: {
    backgroundColor: colors.warning + '15',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.warning + '30',
  },
  riskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  riskTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
  },
  riskText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  riskList: {
    gap: spacing.sm,
  },
  riskItem: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  faqItem: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginRight: spacing.md,
  },
  faqAnswer: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
    marginTop: spacing.md,
  },
  ctaSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  ctaTitle: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  ctaSubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
});
