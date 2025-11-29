import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  StatusBar,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { space, size, radius, color, type } from '../../constants/design-system';
import { PressableScale, FadeIn, SlideUp } from '../../components/animated';
import { getLiveCampaigns } from '@shared/mock-data';

// Mini sparkline component
function MiniChart({ data, color: lineColor, width = 60, height = 24 }: { data: number[], color: string, width?: number, height?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / range) * height * 0.8 - height * 0.1,
  }));
  
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const cp1x = points[i-1].x + (points[i].x - points[i-1].x) / 3;
    const cp2x = points[i-1].x + (points[i].x - points[i-1].x) * 2 / 3;
    path += ` C ${cp1x} ${points[i-1].y}, ${cp2x} ${points[i].y}, ${points[i].x} ${points[i].y}`;
  }
  
  return (
    <Svg width={width} height={height}>
      <Path d={path} stroke={lineColor} strokeWidth={1.5} fill="none" />
    </Svg>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Trending');
  const campaigns = getLiveCampaigns();

  const filters = ['Trending', 'New', 'Closing Soon', 'Popular'];
  const chartData = [10000, 10500, 11200, 10800, 11500, 12300, 12800, 13200, 14100, 13800, 15200, 16750];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  // Generate chart path
  const generateChartPath = () => {
    const width = 320;
    const height = 100;
    const max = Math.max(...chartData);
    const min = Math.min(...chartData);
    const range = max - min;
    
    const points = chartData.map((v, i) => ({
      x: (i / (chartData.length - 1)) * width,
      y: height - ((v - min) / range) * height * 0.85 - 8,
    }));
    
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const cp1x = points[i-1].x + (points[i].x - points[i-1].x) / 3;
      const cp2x = points[i-1].x + (points[i].x - points[i-1].x) * 2 / 3;
      path += ` C ${cp1x} ${points[i-1].y}, ${cp2x} ${points[i].y}, ${points[i].x} ${points[i].y}`;
    }
    
    return path;
  };

  const generateFillPath = () => {
    const linePath = generateChartPath();
    return `${linePath} L 320 100 L 0 100 Z`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={color.bg} />
      
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={color.accent} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <FadeIn>
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <MaterialCommunityIcons name="account" size={20} color={color.textSecondary} />
              </View>
            </View>
            <View style={styles.headerIcons}>
              <PressableScale style={styles.iconButton}>
                <MaterialCommunityIcons name="bell-outline" size={22} color={color.textPrimary} />
              </PressableScale>
              <PressableScale style={styles.iconButton}>
                <MaterialCommunityIcons name="cog-outline" size={22} color={color.textPrimary} />
              </PressableScale>
            </View>
          </View>
        </FadeIn>

        {/* Filter Pills */}
        <SlideUp delay={50}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.filtersContainer}
          >
            {filters.map((filter) => (
              <PressableScale
                key={filter}
                style={[styles.filterPill, activeFilter === filter && styles.filterPillActive]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
                  {filter}
                </Text>
              </PressableScale>
            ))}
          </ScrollView>
        </SlideUp>

        {/* Portfolio Overview Section */}
        <SlideUp delay={100}>
          <Text style={styles.sectionTitle}>Portfolio Overview</Text>
          
          {/* Portfolio Cards */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.portfolioCardsContainer}
          >
            {campaigns.slice(0, 3).map((campaign, index) => {
              const isUp = index !== 1;
              const change = isUp ? '+0.3%' : '-0.3%';
              const cardColors = [
                { bg: '#166534', accent: '#22C55E' },
                { bg: '#7C3AED', accent: '#A78BFA' },
                { bg: '#1E40AF', accent: '#3B82F6' },
              ];
              const cardColor = cardColors[index % cardColors.length];
              
              return (
                <PressableScale
                  key={campaign.id}
                  style={[styles.portfolioCard, { backgroundColor: cardColor.bg }]}
                  onPress={() => router.push(`/deal/${campaign.slug}`)}
                >
                  <View style={styles.portfolioCardHeader}>
                    <View style={styles.portfolioLogo}>
                      <Text style={styles.portfolioLogoText}>{campaign.company_name[0]}</Text>
                    </View>
                    <Text style={styles.portfolioCompany}>{campaign.company_name}</Text>
                  </View>
                  <Text style={styles.portfolioAmount}>
                    ${(campaign.amount_raised / 100).toFixed(2)}
                  </Text>
                  <View style={styles.portfolioFooter}>
                    <Text style={styles.portfolioTarget}>
                      ${(campaign.target_amount / 1000).toFixed(0)}k
                    </Text>
                    <Text style={[styles.portfolioChange, { color: isUp ? '#4ADE80' : '#F87171' }]}>
                      {change}
                    </Text>
                  </View>
                  <View style={styles.portfolioActions}>
                    <PressableScale style={styles.actionButton}>
                      <Text style={styles.actionButtonText}>Buy</Text>
                    </PressableScale>
                    <PressableScale style={[styles.actionButton, styles.actionButtonOutline]}>
                      <Text style={[styles.actionButtonText, styles.actionButtonTextOutline]}>Sell</Text>
                    </PressableScale>
                  </View>
                </PressableScale>
              );
            })}
          </ScrollView>
        </SlideUp>

        {/* Top Trending Section */}
        <SlideUp delay={200}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Trending Stocks</Text>
            <PressableScale style={styles.dropdownButton}>
              <Text style={styles.dropdownText}>Today</Text>
              <MaterialCommunityIcons name="chevron-down" size={16} color={color.textSecondary} />
            </PressableScale>
          </View>

          {/* Stock List */}
          <View style={styles.stockList}>
            {campaigns.map((campaign, index) => {
              const isUp = index % 2 === 0;
              const changePercent = isUp ? `+${(Math.random() * 2).toFixed(2)}%` : `-${(Math.random() * 2).toFixed(2)}%`;
              const sparklineData = Array.from({ length: 10 }, () => Math.random() * 100);
              
              return (
                <PressableScale
                  key={campaign.id}
                  style={styles.stockItem}
                  onPress={() => router.push(`/deal/${campaign.slug}`)}
                >
                  <View style={styles.stockLeft}>
                    <View style={styles.stockLogo}>
                      <Text style={styles.stockLogoText}>{campaign.company_name[0]}</Text>
                    </View>
                    <View style={styles.stockInfo}>
                      <Text style={styles.stockName}>{campaign.company_name}</Text>
                      <Text style={styles.stockSubtitle} numberOfLines={1}>
                        {campaign.tagline?.substring(0, 20) || 'Investment opportunity'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.stockRight}>
                    <MiniChart 
                      data={sparklineData} 
                      color={isUp ? color.success : color.error}
                    />
                    <View style={styles.stockPriceContainer}>
                      <Text style={styles.stockPrice}>
                        ${(campaign.amount_raised / 1000).toFixed(2)}
                      </Text>
                      <Text style={[styles.stockChange, { color: isUp ? color.success : color.error }]}>
                        {changePercent}
                      </Text>
                    </View>
                  </View>
                </PressableScale>
              );
            })}
          </View>
        </SlideUp>

        {/* Bottom padding */}
        <View style={{ height: insets.bottom + 100 }} />
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
    paddingHorizontal: 20,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: color.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: color.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Filters
  filtersContainer: {
    gap: 8,
    marginBottom: 24,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: color.bgCard,
  },
  filterPillActive: {
    backgroundColor: color.textPrimary,
  },
  filterText: {
    ...type.labelMedium,
    color: color.textSecondary,
  },
  filterTextActive: {
    color: color.bg,
  },

  // Section
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    ...type.titleLarge,
    color: color.textPrimary,
    marginBottom: 16,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dropdownText: {
    ...type.bodySmall,
    color: color.textSecondary,
  },

  // Portfolio Cards
  portfolioCardsContainer: {
    gap: 12,
    paddingBottom: 8,
    marginBottom: 24,
  },
  portfolioCard: {
    width: 160,
    padding: 16,
    borderRadius: 20,
  },
  portfolioCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  portfolioLogo: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  portfolioLogoText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  portfolioCompany: {
    ...type.labelMedium,
    color: 'rgba(255,255,255,0.9)',
    flex: 1,
  },
  portfolioAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  portfolioFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  portfolioTarget: {
    ...type.bodySmall,
    color: 'rgba(255,255,255,0.6)',
  },
  portfolioChange: {
    ...type.labelSmall,
    fontWeight: '600',
  },
  portfolioActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  actionButtonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  actionButtonText: {
    ...type.labelSmall,
    color: '#000',
    fontWeight: '600',
  },
  actionButtonTextOutline: {
    color: '#fff',
  },

  // Stock List
  stockList: {
    gap: 4,
  },
  stockItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  stockLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stockLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: color.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stockLogoText: {
    ...type.titleMedium,
    color: color.textPrimary,
  },
  stockInfo: {
    flex: 1,
  },
  stockName: {
    ...type.titleSmall,
    color: color.textPrimary,
    marginBottom: 2,
  },
  stockSubtitle: {
    ...type.bodySmall,
    color: color.textSecondary,
  },
  stockRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stockPriceContainer: {
    alignItems: 'flex-end',
  },
  stockPrice: {
    ...type.titleSmall,
    color: color.textPrimary,
  },
  stockChange: {
    ...type.labelSmall,
  },
});
