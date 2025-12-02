import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { Button, Input } from '../../components';

const STAGES = [
  { key: 'pre-seed', label: 'Pre-seed' },
  { key: 'seed', label: 'Seed' },
  { key: 'series-a', label: 'Series A' },
  { key: 'other', label: 'Other' },
];

const BENEFITS = [
  {
    icon: 'people-outline' as const,
    title: 'Engaged community',
    description: 'Turn your biggest fans into investors and advocates.',
  },
  {
    icon: 'document-text-outline' as const,
    title: 'Clean cap table',
    description: 'All crowd investors pooled into a single SPV.',
  },
  {
    icon: 'flash-outline' as const,
    title: 'Simple process',
    description: 'We handle legal, compliance, and investor communications.',
  },
];

export default function FoundersApplyScreen() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [stage, setStage] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [desiredRaise, setDesiredRaise] = useState('');

  const handleSubmit = async () => {
    if (!companyName || !contactName || !contactEmail || !stage) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.backButton} />
          <View style={styles.backButton} />
        </View>

        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark" size={48} color={colors.white} />
          </View>
          <Text style={styles.successTitle}>Application received!</Text>
          <Text style={styles.successText}>
            Thanks for your interest in raising with 9xf. We'll review your application and get back
            to you within 5 business days.
          </Text>
          <Button
            title="Back to home"
            onPress={() => router.replace('/(tabs)/home')}
            size="lg"
            fullWidth
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Raise with 9xf</Text>
        <View style={styles.backButton} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero */}
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>Turn your customers into investors</Text>
            <Text style={styles.heroSubtitle}>
              Allocate a small slice of your round to the crowd. Keep your cap table clean with a
              single pooled vehicle.
            </Text>
          </View>

          {/* Benefits */}
          <View style={styles.benefitsSection}>
            {BENEFITS.map((benefit, index) => (
              <View key={index} style={styles.benefitCard}>
                <View style={styles.benefitIcon}>
                  <Ionicons name={benefit.icon} size={24} color={colors.accent} />
                </View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>{benefit.title}</Text>
                  <Text style={styles.benefitDescription}>{benefit.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Form */}
          <View style={styles.formSection}>
            <Text style={styles.formTitle}>Apply to raise</Text>
            <Text style={styles.formSubtitle}>
              Tell us about your company. We'll be in touch within 5 business days.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Company name <Text style={styles.required}>*</Text>
              </Text>
              <Input
                placeholder="Your company name"
                value={companyName}
                onChangeText={setCompanyName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Website</Text>
              <Input
                placeholder="https://yourcompany.com"
                value={website}
                onChangeText={setWebsite}
                keyboardType="url"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Your name <Text style={styles.required}>*</Text>
              </Text>
              <Input
                placeholder="Founder name"
                value={contactName}
                onChangeText={setContactName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Email <Text style={styles.required}>*</Text>
              </Text>
              <Input
                placeholder="you@company.com"
                value={contactEmail}
                onChangeText={setContactEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Stage <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.stageGrid}>
                {STAGES.map((s) => (
                  <TouchableOpacity
                    key={s.key}
                    style={[styles.stageButton, stage === s.key && styles.stageButtonActive]}
                    onPress={() => setStage(s.key)}
                  >
                    <Text
                      style={[styles.stageText, stage === s.key && styles.stageTextActive]}
                    >
                      {s.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tell us about your company</Text>
              <TextInput
                style={styles.textArea}
                placeholder="What does your company do? What problem are you solving?"
                placeholderTextColor={colors.textMuted}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>How much do you want to raise from the crowd?</Text>
              <Input
                placeholder="e.g., $100,000"
                value={desiredRaise}
                onChangeText={setDesiredRaise}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={{ height: spacing.xxxl }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Submit Button */}
      <View style={styles.bottomBar}>
        <Button
          title={isSubmitting ? 'Submitting...' : 'Submit application'}
          onPress={handleSubmit}
          fullWidth
          size="lg"
          disabled={isSubmitting}
        />
      </View>
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  hero: {
    marginBottom: spacing.xl,
  },
  heroTitle: {
    fontSize: fontSize.xxl,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  benefitsSection: {
    marginBottom: spacing.xl,
  },
  benefitCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accent + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  benefitDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  formSection: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
  },
  formTitle: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  formSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  required: {
    color: colors.error,
  },
  stageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  stageButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  stageButtonActive: {
    backgroundColor: colors.accent + '15',
    borderColor: colors.accent,
  },
  stageText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  stageTextActive: {
    color: colors.accent,
  },
  textArea: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
    height: 120,
  },
  bottomBar: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  successTitle: {
    fontSize: fontSize.xxl,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  successText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
});
