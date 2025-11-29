import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { Button, Input } from '../../components';
import { useAppStore } from '../../store';

export default function VCApplyScreen() {
  const router = useRouter();
  const { setVCApplication } = useAppStore();
  
  const [fundName, setFundName] = useState('');
  const [fundType, setFundType] = useState<'vc_fund' | 'solo_gp' | 'angel_syndicate'>('vc_fund');
  const [website, setWebsite] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [description, setDescription] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fundTypes = [
    { value: 'vc_fund', label: 'VC Fund' },
    { value: 'solo_gp', label: 'Solo GP' },
    { value: 'angel_syndicate', label: 'Angel Syndicate' },
  ];

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setVCApplication({
      id: Date.now().toString(),
      user_id: '1',
      fund_name: fundName,
      fund_type: fundType,
      website,
      linkedin_url: linkedIn,
      description,
      work_email: workEmail,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    setIsLoading(false);
    router.back();
  };

  const isValid = fundName && description && workEmail;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="close" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Apply as a VC</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Intro */}
          <View style={styles.intro}>
            <View style={styles.introIcon}>
              <Ionicons name="business" size={32} color={colors.primary} />
            </View>
            <Text style={styles.introTitle}>For VCs and fund managers</Text>
            <Text style={styles.introText}>
              List your deals, allocate a crowd slice, and let your community co-invest alongside you.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Fund/firm name"
              placeholder="e.g., Acme Ventures"
              value={fundName}
              onChangeText={setFundName}
            />

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Type</Text>
              <View style={styles.typeOptions}>
                {fundTypes.map((type) => (
                  <TouchableOpacity
                    key={type.value}
                    style={[
                      styles.typeOption,
                      fundType === type.value && styles.typeOptionActive,
                    ]}
                    onPress={() => setFundType(type.value as typeof fundType)}
                  >
                    <Text
                      style={[
                        styles.typeOptionText,
                        fundType === type.value && styles.typeOptionTextActive,
                      ]}
                    >
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Input
              label="Website"
              placeholder="https://yourfund.com"
              value={website}
              onChangeText={setWebsite}
              keyboardType="url"
              autoCapitalize="none"
            />

            <Input
              label="LinkedIn URL"
              placeholder="https://linkedin.com/in/..."
              value={linkedIn}
              onChangeText={setLinkedIn}
              keyboardType="url"
              autoCapitalize="none"
            />

            <Input
              label="Brief description"
              placeholder="What do you invest in?"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
            />

            <Input
              label="Work email"
              placeholder="you@yourfund.com"
              value={workEmail}
              onChangeText={setWorkEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </ScrollView>

        {/* CTA */}
        <View style={styles.footer}>
          <Button
            title="Submit application"
            onPress={handleSubmit}
            fullWidth
            size="lg"
            loading={isLoading}
            disabled={!isValid}
          />
          <Text style={styles.footerNote}>
            We'll review your application and contact you within 2-3 business days.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  backButton: {
    padding: spacing.sm,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  intro: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  introIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  introTitle: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  introText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    gap: spacing.md,
  },
  fieldGroup: {
    marginBottom: spacing.md,
  },
  fieldLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  typeOptions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  typeOption: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeOptionActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '15',
  },
  typeOptionText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  typeOptionTextActive: {
    color: colors.primary,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  footerNote: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
