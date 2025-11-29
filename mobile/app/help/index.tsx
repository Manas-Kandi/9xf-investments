import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';

const FAQ_CATEGORIES = [
  {
    title: 'Getting Started',
    icon: 'rocket-outline' as const,
    faqs: [
      {
        question: 'How do I create an account?',
        answer:
          'Download the app and tap "Get Started". You can sign up with your email or use Google/Apple sign-in. You\'ll need to verify your identity before you can invest.',
      },
      {
        question: 'What do I need to verify my identity?',
        answer:
          'You\'ll need to provide your full legal name, date of birth, Social Security Number (for tax purposes), and a government-issued ID. This is required by law for investment platforms.',
      },
      {
        question: 'How long does verification take?',
        answer:
          'Most verifications are completed within minutes. In some cases, additional review may be needed, which can take 1-2 business days.',
      },
    ],
  },
  {
    title: 'Investing',
    icon: 'trending-up-outline' as const,
    faqs: [
      {
        question: 'What is the minimum investment?',
        answer:
          'Minimum investments vary by campaign but typically start at $50. Each campaign page shows the specific minimum.',
      },
      {
        question: 'What am I actually buying?',
        answer:
          'You\'re buying a share of a pooled investment vehicle (like an SPV) that holds equity or a SAFE in the startup. This keeps the company\'s cap table clean while giving you economic ownership.',
      },
      {
        question: 'When will I see returns?',
        answer:
          'Startup investing is long-term. You may not see any returns for 5-10+ years, and only if the company is acquired or goes public. Many startups fail, so you could lose your entire investment.',
      },
      {
        question: 'Can I sell my investment?',
        answer:
          'These are illiquid investments. You generally cannot sell until there\'s an exit event (acquisition or IPO). There is no secondary market for these investments.',
      },
    ],
  },
  {
    title: 'Payments',
    icon: 'card-outline' as const,
    faqs: [
      {
        question: 'How do I add a payment method?',
        answer:
          'Go to Account > Payment Methods and tap "Link bank account". We use Plaid to securely connect to your bank without storing your login credentials.',
      },
      {
        question: 'When is my account charged?',
        answer:
          'Your bank account is charged via ACH when you confirm an investment. The transfer typically takes 3-5 business days to complete.',
      },
      {
        question: 'Can I cancel an investment?',
        answer:
          'You can cancel an investment within 48 hours of making it, as long as the campaign hasn\'t closed. Contact support to request a cancellation.',
      },
    ],
  },
  {
    title: 'Account & Security',
    icon: 'shield-checkmark-outline' as const,
    faqs: [
      {
        question: 'How is my information protected?',
        answer:
          'We use bank-level encryption to protect your data. Your personal information is never shared without your consent, and we follow strict security protocols.',
      },
      {
        question: 'How do I update my profile?',
        answer:
          'Go to Account > Edit Profile to update your name, email, or address. Some changes may require re-verification.',
      },
      {
        question: 'How do I delete my account?',
        answer:
          'Go to Account > Edit Profile and tap "Delete account" at the bottom. Note that you cannot delete your account while you have active investments.',
      },
    ],
  },
];

export default function HelpScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<number | null>(0);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const filteredCategories = searchQuery.trim()
    ? FAQ_CATEGORIES.map((category) => ({
        ...category,
        faqs: category.faqs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((category) => category.faqs.length > 0)
    : FAQ_CATEGORIES;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & FAQ</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for help..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => router.push('/help/contact')}
          >
            <View style={styles.quickActionIcon}>
              <Ionicons name="chatbubble-outline" size={24} color={colors.primary} />
            </View>
            <Text style={styles.quickActionText}>Contact Support</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => router.push('/how-it-works')}
          >
            <View style={styles.quickActionIcon}>
              <Ionicons name="information-circle-outline" size={24} color={colors.primary} />
            </View>
            <Text style={styles.quickActionText}>How It Works</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => router.push('/risk-disclosure')}
          >
            <View style={styles.quickActionIcon}>
              <Ionicons name="warning-outline" size={24} color={colors.primary} />
            </View>
            <Text style={styles.quickActionText}>Risk Disclosure</Text>
          </TouchableOpacity>
        </View>

        {/* FAQ Categories */}
        {filteredCategories.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No results found</Text>
            <Text style={styles.emptyText}>
              Try searching with different keywords or contact support for help.
            </Text>
          </View>
        ) : (
          filteredCategories.map((category, categoryIndex) => (
            <View key={categoryIndex} style={styles.category}>
              <TouchableOpacity
                style={styles.categoryHeader}
                onPress={() =>
                  setExpandedCategory(expandedCategory === categoryIndex ? null : categoryIndex)
                }
              >
                <View style={styles.categoryTitleRow}>
                  <Ionicons name={category.icon} size={22} color={colors.textPrimary} />
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                </View>
                <Ionicons
                  name={expandedCategory === categoryIndex ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={colors.textMuted}
                />
              </TouchableOpacity>

              {expandedCategory === categoryIndex && (
                <View style={styles.faqList}>
                  {category.faqs.map((faq, faqIndex) => {
                    const faqKey = `${categoryIndex}-${faqIndex}`;
                    return (
                      <TouchableOpacity
                        key={faqIndex}
                        style={styles.faqItem}
                        onPress={() => setExpandedFaq(expandedFaq === faqKey ? null : faqKey)}
                      >
                        <View style={styles.faqQuestion}>
                          <Text style={styles.faqQuestionText}>{faq.question}</Text>
                          <Ionicons
                            name={expandedFaq === faqKey ? 'remove' : 'add'}
                            size={20}
                            color={colors.primary}
                          />
                        </View>
                        {expandedFaq === faqKey && (
                          <Text style={styles.faqAnswer}>{faq.answer}</Text>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          ))
        )}

        {/* Still need help */}
        <View style={styles.helpBanner}>
          <Text style={styles.helpBannerTitle}>Still need help?</Text>
          <Text style={styles.helpBannerText}>
            Our support team is available Monday-Friday, 9am-6pm PT.
          </Text>
          <TouchableOpacity
            style={styles.helpBannerButton}
            onPress={() => router.push('/help/contact')}
          >
            <Text style={styles.helpBannerButtonText}>Contact Support</Text>
          </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
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
  quickActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  quickAction: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  quickActionText: {
    fontSize: fontSize.xs,
    color: colors.textPrimary,
    fontWeight: '500',
    textAlign: 'center',
  },
  category: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  categoryTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  faqList: {
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  faqItem: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  faqQuestionText: {
    flex: 1,
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textPrimary,
    marginRight: spacing.md,
  },
  faqAnswer: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
    marginTop: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
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
  helpBanner: {
    backgroundColor: colors.primary + '10',
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  helpBannerTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  helpBannerText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  helpBannerButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
  },
  helpBannerButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.white,
  },
});
