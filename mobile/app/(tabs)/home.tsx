import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, fontSize } from '../../constants/theme';
import { DealCard } from '../../components';
import { getLiveCampaigns, getFeaturedCampaign } from '../../data/mockData';

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);
  
  const featuredCampaign = getFeaturedCampaign();
  const liveCampaigns = getLiveCampaigns();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Co-invest with real VCs</Text>
          <Text style={styles.subtitle}>
            All deals are backed by venture investors. Minimum $50.
          </Text>
        </View>

        {/* Featured Deal */}
        {featuredCampaign && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured deal</Text>
            <DealCard
              campaign={featuredCampaign}
              onPress={() => router.push(`/deal/${featuredCampaign.slug}`)}
              featured
            />
          </View>
        )}

        {/* More Opportunities */}
        {liveCampaigns.length > 1 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>More opportunities</Text>
            {liveCampaigns.slice(1).map((campaign) => (
              <DealCard
                key={campaign.id}
                campaign={campaign}
                onPress={() => router.push(`/deal/${campaign.slug}`)}
              />
            ))}
          </View>
        )}

        {/* Education Card */}
        <View style={styles.educationCard}>
          <Text style={styles.educationTitle}>New to this?</Text>
          <Text style={styles.educationText}>
            Learn how co-investing with VCs works and what to expect.
          </Text>
          <Text style={styles.educationLink}>How co-investing works →</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 24,
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
  educationCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  educationTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  educationText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  educationLink: {
    fontSize: fontSize.sm,
    color: colors.link,
    fontWeight: '500',
  },
});
