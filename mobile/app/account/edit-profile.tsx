import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { Button, Input } from '../../components';
import { useAppStore } from '../../store';

export default function EditProfileScreen() {
  const router = useRouter();
  const { user, updateUser } = useAppStore();

  const [fullName, setFullName] = useState(user?.full_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [dateOfBirth, setDateOfBirth] = useState(user?.date_of_birth || '');
  const [address, setAddress] = useState(user?.address || '');
  const [citizenship, setCitizenship] = useState(user?.citizenship || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    updateUser({
      full_name: fullName,
      email,
      date_of_birth: dateOfBirth,
      address,
      citizenship,
    });

    setIsSaving(false);
    Alert.alert('Success', 'Your profile has been updated.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  const hasChanges =
    fullName !== (user?.full_name || '') ||
    email !== (user?.email || '') ||
    dateOfBirth !== (user?.date_of_birth || '') ||
    address !== (user?.address || '') ||
    citizenship !== (user?.citizenship || '');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
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
          {/* Avatar */}
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {fullName ? fullName[0].toUpperCase() : user?.email?.[0].toUpperCase() || '?'}
              </Text>
            </View>
            <TouchableOpacity style={styles.changePhotoButton}>
              <Ionicons name="camera-outline" size={18} color={colors.accent} />
              <Text style={styles.changePhotoText}>Change photo</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full name</Text>
              <Input
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <Input
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Text style={styles.hint}>
                Changing your email will require re-verification
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of birth</Text>
              <Input
                placeholder="MM/DD/YYYY"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                keyboardType="numbers-and-punctuation"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Address</Text>
              <Input
                placeholder="Enter your address"
                value={address}
                onChangeText={setAddress}
                multiline
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Citizenship</Text>
              <Input
                placeholder="Country of citizenship"
                value={citizenship}
                onChangeText={setCitizenship}
              />
            </View>
          </View>

          {/* KYC Status */}
          <View style={styles.kycSection}>
            <View style={styles.kycHeader}>
              <Ionicons
                name={user?.kyc_status === 'verified' ? 'shield-checkmark' : 'shield-outline'}
                size={24}
                color={user?.kyc_status === 'verified' ? colors.success : colors.warning}
              />
              <View style={styles.kycInfo}>
                <Text style={styles.kycTitle}>Identity verification</Text>
                <Text style={styles.kycStatus}>
                  {user?.kyc_status === 'verified' ? 'Verified' : 'Pending verification'}
                </Text>
              </View>
            </View>
            {user?.kyc_status !== 'verified' && (
              <TouchableOpacity
                style={styles.verifyButton}
                onPress={() => router.push('/(onboarding)/kyc-intro')}
              >
                <Text style={styles.verifyButtonText}>Complete verification</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Delete Account */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() =>
              Alert.alert(
                'Delete Account',
                'Are you sure you want to delete your account? This action cannot be undone.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Delete', style: 'destructive', onPress: () => {} },
                ]
              )
            }
          >
            <Ionicons name="trash-outline" size={20} color={colors.error} />
            <Text style={styles.deleteButtonText}>Delete account</Text>
          </TouchableOpacity>

          <View style={{ height: spacing.xxl }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Save Button */}
      <View style={styles.bottomBar}>
        <Button
          title={isSaving ? 'Saving...' : 'Save changes'}
          onPress={handleSave}
          fullWidth
          size="lg"
          disabled={!hasChanges || isSaving}
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
  avatarSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: fontSize.xxxl,
    fontWeight: '600',
    color: colors.white,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  changePhotoText: {
    fontSize: fontSize.sm,
    color: colors.accent,
    fontWeight: '500',
  },
  form: {
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
  hint: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  kycSection: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  kycHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  kycInfo: {
    flex: 1,
  },
  kycTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  kycStatus: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  verifyButton: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.accent + '15',
    borderRadius: borderRadius.md,
    alignSelf: 'flex-start',
  },
  verifyButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.accent,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  deleteButtonText: {
    fontSize: fontSize.md,
    color: colors.error,
    fontWeight: '500',
  },
  bottomBar: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
