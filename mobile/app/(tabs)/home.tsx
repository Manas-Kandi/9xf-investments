import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, typography, shape } from '../../constants/theme';
import { getLiveCampaigns } from '../../data/mockData';

// Pastel card colors for each deal
const cardColors = [
  { bg: colors.cardMint, text: colors.onCardMint },
  { bg: colors.cardCream, text: colors.onCardCream },
  { bg: colors.cardCyan, text: colors.onCardCyan },
  { bg: colors.cardLavender, text: colors.onCardLavender },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = React.useState(false);
  const campaigns = getLiveCampaigns();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + spacing.lg }
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            progressBackgroundColor={colors.surfaceCard}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headline}>Invest</Text>
        </View>

        {/* Hero stat card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroValue}>
            {campaigns.length}
            <Text style={styles.heroUnit}> deals</Text>
          </Text>
          <View style={styles.heroMeta}>
            <View style={styles.heroTag}>
              <MaterialCommunityIcons name="arrow-up" size={14} color={colors.cardMint} />
              <Text style={styles.heroTagText}>Live now</Text>
            </View>
          </View>
        </View>

        {/* Section header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Cases</Text>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="tune-variant" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Pastel Deal Cards - Horizontal scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsRow}
        >
          {campaigns.map((campaign, index) => {
            const cardColor = cardColors[index % cardColors.length];
            return (
              <TouchableOpacity
                key={campaign.id}
                style={[styles.dealCard, { backgroundColor: cardColor.bg }]}
                onPress={() => router.push(`/deal/${campaign.slug}`)}
                activeOpacity={0.9}
              >
                {/* Company logo placeholder */}
                <View style={[styles.cardLogo, { backgroundColor: cardColor.text + '20' }]}>
                  <Text style={[styles.cardLogoText, { color: cardColor.text }]}>
                    {campaign.company_name[0]}
                  </Text>
                </View>
                
                {/* Company name */}
                <Text style={[styles.cardTitle, { color: cardColor.text }]}>
                  {campaign.company_name}
                </Text>
                
                {/* Amount */}
                <Text style={[styles.cardAmount, { color: cardColor.text }]}>
                  ${(campaign.amount_raised / 1000).toFixed(0)}k
                </Text>
                
                {/* Mini chart placeholder */}
                <View style={styles.cardChart}>
                  <MaterialCommunityIcons 
                    name="chart-line" 
                    size={48} 
                    color={cardColor.text + '30'} 
                  />
                </View>
                
                {/* Action button */}
                <TouchableOpacity 
                  style={[styles.cardButton, { borderColor: cardColor.text + '40' }]}
                >
                  <MaterialCommunityIcons 
                    name="arrow-down" 
                    size={16} 
                    color={cardColor.text} 
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* About section */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>About</Text>
          <Text style={styles.aboutText}>
            Co-invest alongside top VCs. All deals are vetted, with minimum investments from $50.
          </Text>
          <TouchableOpacity>
            <Text style={styles.aboutLink}>Show more</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom padding */}
        <View style={{ height: insets.bottom + 120 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  
  // Header
  header: {
    marginBottom: spacing.xl,
  },
  headline: {
    ...typography.headlineLarge,
    color: colors.textPrimary,
    fontWeight: '600',
  },

  // Hero stat card
  heroCard: {
    backgroundColor: colors.surfaceCard,
    borderRadius: shape.xl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
  },
  heroValue: {
    fontSize: 48,
    fontWeight: '300',
    color: colors.textPrimary,
    letterSpacing: -2,
  },
  heroUnit: {
    fontSize: 24,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  heroMeta: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  heroTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  heroTagText: {
    ...typography.bodySmall,
    color: colors.cardMint,
  },

  // Section
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.titleLarge,
    color: colors.textPrimary,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: shape.full,
    backgroundColor: colors.surfaceCard,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Cards row
  cardsRow: {
    paddingRight: spacing.lg,
    gap: spacing.md,
  },

  // Pastel deal card
  dealCard: {
    width: 160,
    height: 200,
    borderRadius: shape.xl,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  cardLogo: {
    width: 36,
    height: 36,
    borderRadius: shape.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLogoText: {
    ...typography.titleMedium,
    fontWeight: '600',
  },
  cardTitle: {
    ...typography.titleSmall,
    fontWeight: '600',
  },
  cardAmount: {
    ...typography.headlineMedium,
    fontWeight: '500',
  },
  cardChart: {
    position: 'absolute',
    bottom: 50,
    right: 16,
    opacity: 0.5,
  },
  cardButton: {
    width: 32,
    height: 32,
    borderRadius: shape.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },

  // About section
  aboutSection: {
    marginTop: spacing.xl,
    paddingTop: spacing.xl,
  },
  aboutTitle: {
    ...typography.titleLarge,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  aboutText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  aboutLink: {
    ...typography.labelLarge,
    color: colors.link,
  },
});
