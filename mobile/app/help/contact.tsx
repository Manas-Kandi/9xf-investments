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
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { Button } from '../../components';

const TOPICS = [
  { key: 'account', label: 'Account & Verification' },
  { key: 'investment', label: 'Investment Question' },
  { key: 'payment', label: 'Payment Issue' },
  { key: 'technical', label: 'Technical Problem' },
  { key: 'other', label: 'Other' },
];

export default function ContactScreen() {
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedTopic || !message.trim()) {
      Alert.alert('Missing Information', 'Please select a topic and enter your message.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    Alert.alert(
      'Message Sent',
      "We've received your message and will respond within 1-2 business days.",
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@9xf.com');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Support</Text>
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
          {/* Intro */}
          <View style={styles.intro}>
            <View style={styles.introIcon}>
              <Ionicons name="chatbubbles" size={32} color={colors.primary} />
            </View>
            <Text style={styles.introTitle}>How can we help?</Text>
            <Text style={styles.introText}>
              Send us a message and we'll get back to you within 1-2 business days.
            </Text>
          </View>

          {/* Topic Selection */}
          <View style={styles.section}>
            <Text style={styles.label}>What's this about?</Text>
            <View style={styles.topicGrid}>
              {TOPICS.map((topic) => (
                <TouchableOpacity
                  key={topic.key}
                  style={[
                    styles.topicButton,
                    selectedTopic === topic.key && styles.topicButtonActive,
                  ]}
                  onPress={() => setSelectedTopic(topic.key)}
                >
                  <Text
                    style={[
                      styles.topicText,
                      selectedTopic === topic.key && styles.topicTextActive,
                    ]}
                  >
                    {topic.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Subject */}
          <View style={styles.section}>
            <Text style={styles.label}>Subject (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Brief description of your issue"
              placeholderTextColor={colors.textMuted}
              value={subject}
              onChangeText={setSubject}
            />
          </View>

          {/* Message */}
          <View style={styles.section}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tell us more about how we can help..."
              placeholderTextColor={colors.textMuted}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Alternative Contact */}
          <View style={styles.alternativeSection}>
            <Text style={styles.alternativeTitle}>Prefer email?</Text>
            <TouchableOpacity style={styles.emailButton} onPress={handleEmail}>
              <Ionicons name="mail-outline" size={20} color={colors.primary} />
              <Text style={styles.emailText}>support@9xf.com</Text>
            </TouchableOpacity>
          </View>

          {/* Response Time */}
          <View style={styles.infoCard}>
            <Ionicons name="time-outline" size={20} color={colors.textSecondary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Response times</Text>
              <Text style={styles.infoText}>
                Our support team typically responds within 1-2 business days. For urgent issues,
                please mention "URGENT" in your subject line.
              </Text>
            </View>
          </View>

          <View style={{ height: spacing.xxxl }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Submit Button */}
      <View style={styles.bottomBar}>
        <Button
          title={isSubmitting ? 'Sending...' : 'Send Message'}
          onPress={handleSubmit}
          fullWidth
          size="lg"
          disabled={!selectedTopic || !message.trim() || isSubmitting}
        />
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
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
  },
  section: {
    marginBottom: spacing.xl,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  topicGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  topicButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  topicButtonActive: {
    backgroundColor: colors.primary + '15',
    borderColor: colors.primary,
  },
  topicText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  topicTextActive: {
    color: colors.primary,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  textArea: {
    height: 150,
    paddingTop: spacing.md,
  },
  alternativeSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  alternativeTitle: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  emailText: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: '500',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  infoText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  bottomBar: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
});
