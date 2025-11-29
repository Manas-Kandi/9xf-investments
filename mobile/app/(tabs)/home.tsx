import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { space, size, radius, color, type, layout } from '../../constants/design-system';
import { PressableScale, FadeIn, SlideUp, AnimatedProgress } from '../../components/animated';
import { getLiveCampaigns } from '@shared/mock-data';

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
      <StatusBar barStyle="light-content" backgroundColor={color.bg} />
      
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + space.medium }
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={color.accent}
            progressBackgroundColor={color.bgCard}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <FadeIn>
          <View style={styles.header}>
            <Text style={styles.headline}>Invest</Text>
            <PressableScale style={styles.avatarButton}>
              <MaterialCommunityIcons name="account-circle" size={32} color={color.textSecondary} />
            </PressableScale>
          </View>
        </FadeIn>

        {/* Investment Performance Chart */}
        <SlideUp delay={100}>
          <View style={{ backgroundColor: color.bgCard, borderRadius: 20, padding: space.large, marginBottom: space.large }}>
            <Text style={{ color: color.textSecondary, fontSize: 12, marginBottom: 4 }}>Total Value</Text>
            <Text style={{ color: color.textPrimary, fontSize: 32, fontWeight: '700', marginBottom: 8 }}>$16,750</Text>
            <Text style={{ color: color.success, fontSize: 16, fontWeight: '600' }}>+67.50% from $10,000 invested</Text>
            
            {/* Simple bar chart */}
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 120, marginTop: 24, paddingHorizontal: 8 }}>
              {[10000, 10500, 11200, 10800, 11500, 12300, 12800, 13200, 14100, 13800, 15200, 16750].map((value, index) => {
                const maxVal = 16750;
                const minVal = 10000;
                const height = ((value - minVal) / (maxVal - minVal)) * 100 + 10;
                return (
                  <View key={index} style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ width: '60%', height, backgroundColor: color.success, borderRadius: 4, opacity: 0.8 }} />
                  </View>
                );
              })}
            </View>
            
            {/* Labels */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingHorizontal: 4 }}>
              {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((label, index) => (
                <Text key={index} style={{ color: color.textTertiary, fontSize: 10, flex: 1, textAlign: 'center' }}>{label}</Text>
              ))}
            </View>
          </View>
        </SlideUp>

        {/* Section header */}
        <SlideUp delay={200}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Cases</Text>
            <PressableScale style={styles.iconButton}>
              <MaterialCommunityIcons name="tune-variant" size={20} color={color.textSecondary} />
            </PressableScale>
          </View>
        </SlideUp>

        {/* Pastel Deal Cards - Horizontal scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsRow}
        >
          {campaigns.map((campaign, index) => {
            const cardStyle = color.cards[index % color.cards.length];
            const progress = Math.min((campaign.amount_raised / campaign.target_amount) * 100, 100);
            
            return (
              <SlideUp key={campaign.id} delay={300 + index * 50}>
                <PressableScale
                  style={[styles.dealCard, { backgroundColor: cardStyle.bg }]}
                  onPress={() => router.push(`/deal/${campaign.slug}`)}
                >
                  {/* Logo */}
                  <View style={[styles.cardLogo, { backgroundColor: cardStyle.text + '15' }]}>
                    <Text style={[styles.cardLogoText, { color: cardStyle.text }]}>
                      {campaign.company_name[0]}
                    </Text>
                  </View>
                  
                  {/* Company name */}
                  <Text style={[styles.cardCompany, { color: cardStyle.text }]}>
                    {campaign.company_name}
                  </Text>
                  
                  {/* Amount */}
                  <Text style={[styles.cardAmount, { color: cardStyle.text }]}>
                    ${(campaign.amount_raised / 1000).toFixed(0)}k
                  </Text>
                  
                  {/* Progress */}
                  <AnimatedProgress 
                    progress={progress} 
                    color={cardStyle.text}
                    trackColor={cardStyle.text + '30'}
                    height={3}
                  />
                  
                  {/* Action button */}
                  <PressableScale 
                    style={[styles.cardButton, { borderColor: cardStyle.text + '30' }]}
                  >
                    <MaterialCommunityIcons 
                      name="arrow-down" 
                      size={16} 
                      color={cardStyle.text} 
                    />
                  </PressableScale>
                </PressableScale>
              </SlideUp>
            );
          })}
        </ScrollView>

        {/* About section */}
        <SlideUp delay={500}>
          <View style={styles.aboutSection}>
            <Text style={styles.aboutTitle}>About</Text>
            <Text style={styles.aboutText}>
              Co-invest alongside top VCs. All deals are vetted, with minimum investments from $50.
            </Text>
            <PressableScale>
              <Text style={styles.aboutLink}>Show more</Text>
            </PressableScale>
          </View>
        </SlideUp>

        {/* Bottom padding */}
        <View style={{ height: insets.bottom + 120 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg,
  },
  scrollContent: {
    paddingHorizontal: space.screenX,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: space.large,
  },
  headline: {
    ...type.headlineLarge,
    color: color.textPrimary,
  },
  avatarButton: {
    width: size.avatar.medium,
    height: size.avatar.medium,
    borderRadius: radius.round,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Section
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: space.medium,
  },
  sectionTitle: {
    ...type.titleLarge,
    color: color.textPrimary,
  },
  iconButton: {
    width: size.avatar.medium,
    height: size.avatar.medium,
    borderRadius: radius.round,
    backgroundColor: color.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Cards row
  cardsRow: {
    paddingRight: space.screenX,
    gap: space.small,
  },

  // Pastel deal card
  dealCard: {
    width: size.card.dealCard.width,
    height: size.card.dealCard.height,
    borderRadius: radius.xl,
    padding: space.medium,
    justifyContent: 'space-between',
  },
  cardLogo: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLogoText: {
    ...type.titleMedium,
    fontWeight: '700',
  },
  cardCompany: {
    ...type.titleSmall,
    fontWeight: '600',
  },
  cardAmount: {
    ...type.headlineMedium,
    fontWeight: '500',
  },
  cardButton: {
    width: 32,
    height: 32,
    borderRadius: radius.round,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },

  // About section
  aboutSection: {
    marginTop: space.section,
    paddingTop: space.large,
  },
  aboutTitle: {
    ...type.titleLarge,
    color: color.textPrimary,
    marginBottom: space.small,
  },
  aboutText: {
    ...type.bodyMedium,
    color: color.textSecondary,
    lineHeight: 22,
    marginBottom: space.small,
  },
  aboutLink: {
    ...type.labelLarge,
    color: color.link,
  },
});
