import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, fontSize } from '../../constants/theme';
import { Button, Input } from '../../components';
import { useAppStore } from '../../store';

export default function KYCDetailsScreen() {
  const router = useRouter();
  const { updateUser } = useAppStore();
  
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [citizenship, setCitizenship] = useState('');
  const [ssn, setSsn] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    setIsLoading(true);

    // Simulate KYC verification
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Update user with KYC details
    updateUser({
      full_name: fullName,
      date_of_birth: dateOfBirth,
      address,
      citizenship,
      ssn_last4: ssn,
      kyc_status: 'verified',
    });

    setIsLoading(false);
    router.push('/(onboarding)/funding');
  };

  const isValid = fullName && dateOfBirth && address && citizenship && ssn.length === 4;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Progress indicator */}
          <View style={styles.progress}>
            <View style={[styles.progressDot, styles.progressDotActive]} />
            <View style={[styles.progressDot, styles.progressDotActive]} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
          </View>

          <Text style={styles.title}>Verify your identity</Text>
          <Text style={styles.subtitle}>
            We need to verify your identity once to keep the platform safe and compliant.
          </Text>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Legal full name"
              placeholder="As it appears on your ID"
              value={fullName}
              onChangeText={setFullName}
              autoComplete="name"
            />

            <Input
              label="Date of birth"
              placeholder="mm/dd/yyyy"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              keyboardType="numbers-and-punctuation"
            />

            <Input
              label="Address"
              placeholder="Street, City, State, ZIP"
              value={address}
              onChangeText={setAddress}
              autoComplete="street-address"
            />

            <Input
              label="Country of citizenship"
              placeholder="e.g., United States"
              value={citizenship}
              onChangeText={setCitizenship}
            />

            <Input
              label="Last 4 digits of SSN"
              placeholder="XXXX"
              value={ssn}
              onChangeText={(text) => setSsn(text.slice(0, 4))}
              keyboardType="number-pad"
              maxLength={4}
            />
          </View>
        </ScrollView>

        {/* CTA */}
        <View style={styles.footer}>
          <Button
            title="Continue"
            onPress={handleContinue}
            fullWidth
            size="lg"
            loading={isLoading}
            disabled={!isValid}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    flexGrow: 1,
  },
  progress: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surfaceSecondary,
  },
  progressDotActive: {
    backgroundColor: colors.accent,
    width: 24,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  form: {
    gap: spacing.md,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
