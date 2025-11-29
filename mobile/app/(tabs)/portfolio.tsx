import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing } from '../../constants/theme';
import { color, type } from '../../constants/design-system';
import { PressableScale, FadeIn, SlideUp } from '../../components/animated';
import { Button } from '../../components';
import { useAppStore } from '../../store';

export default function PortfolioScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { investments } = useAppStore();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const statusLabel: Record<string, string> = {
    initiated: 'Pending',
    processing: 'In Progress',
    confirmed: 'Completed',
    failed: 'Failed',
  };

  const statusColor: Record<string, string> = {
    initiated: color.warning,
    processing: color.info,
    confirmed: color.success,
    failed: color.error,
  };

  const actionLabel: Record<string, string> = {
    initiated: 'Buy',
    processing: 'Shop',
    confirmed: 'Buy',
    failed: 'Buy',
  };

  // Group investments by date
  const groupedInvestments = investments.reduce((groups, investment) => {
    const date = new Date(investment.created_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    if (!groups[date]) groups[date] = [];
    groups[date].push(investment);
    return groups;
  }, {} as Record<string, typeof investments>);

  if (investments.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <FadeIn>
          <Text style={styles.pageTitle}>Transaction{'\n'}History</Text>
        </FadeIn>
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <MaterialCommunityIcons name="receipt-text-outline" size={48} color={color.textSecondary} />
          </View>
          <Text style={styles.emptyTitle}>No transactions yet</Text>
          <Text style={styles.emptyText}>
            Your investment history will appear here.
          </Text>
          <PressableScale 
            style={styles.browseButton}
            onPress={() => router.push('/(tabs)/home')}
          >
            <Text style={styles.browseButtonText}>Browse deals</Text>
          </PressableScale>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={color.accent} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <FadeIn>
          <Text style={styles.pageTitle}>Transaction{'\n'}History</Text>
        </FadeIn>

        {/* Search Bar */}
        <SlideUp delay={50}>
          <View style={styles.searchContainer}>
            <MaterialCommunityIcons name="magnify" size={20} color={color.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search transaction"
              placeholderTextColor={color.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <PressableScale style={styles.filterButton}>
              <MaterialCommunityIcons name="tune-variant" size={18} color={color.textSecondary} />
            </PressableScale>
          </View>
        </SlideUp>

        {/* Transaction Groups */}
        {Object.entries(groupedInvestments).map(([date, dateInvestments], groupIndex) => (
          <SlideUp key={date} delay={100 + groupIndex * 50}>
            <Text style={styles.dateHeader}>{date}</Text>
            
            {dateInvestments.map((investment, index) => (
              <PressableScale
                key={investment.id}
                style={styles.transactionItem}
                onPress={() => router.push(`/deal/${investment.campaign?.slug}`)}
              >
                <View style={styles.transactionLeft}>
                  <View style={styles.transactionLogo}>
                    <Text style={styles.transactionLogoText}>
                      {investment.campaign?.company_name?.charAt(0) || '?'}
                    </Text>
                  </View>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionName}>
                      {investment.campaign?.company_name || 'Unknown'}
                    </Text>
                    <View style={styles.transactionMeta}>
                      <View style={[styles.statusBadge, { backgroundColor: statusColor[investment.status] + '20' }]}>
                        <Text style={[styles.statusText, { color: statusColor[investment.status] }]}>
                          {statusLabel[investment.status]}
                        </Text>
                      </View>
                      <Text style={styles.actionText}>{actionLabel[investment.status]}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.transactionRight}>
                  <Text style={styles.transactionAmount}>
                    ${investment.amount.toLocaleString()}
                  </Text>
                  <Text style={styles.transactionTime}>
                    {new Date(investment.created_at).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </Text>
                </View>
              </PressableScale>
            ))}
          </SlideUp>
        ))}

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
  pageTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: color.textPrimary,
    lineHeight: 40,
    marginBottom: 24,
    letterSpacing: -0.5,
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.bgCard,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    ...type.bodyMedium,
    color: color.textPrimary,
    padding: 0,
  },
  filterButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: color.bgElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Date Header
  dateHeader: {
    ...type.titleSmall,
    color: color.textSecondary,
    marginBottom: 12,
    marginTop: 8,
  },

  // Transaction Item
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: color.borderSubtle,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: color.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionLogoText: {
    ...type.titleMedium,
    color: color.textPrimary,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    ...type.titleSmall,
    color: color.textPrimary,
    marginBottom: 6,
  },
  transactionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  actionText: {
    ...type.bodySmall,
    color: color.textSecondary,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    ...type.titleSmall,
    color: color.textPrimary,
    marginBottom: 4,
  },
  transactionTime: {
    ...type.bodySmall,
    color: color.textSecondary,
  },

  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: color.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    ...type.titleLarge,
    color: color.textPrimary,
    marginBottom: 8,
  },
  emptyText: {
    ...type.bodyMedium,
    color: color.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  browseButton: {
    backgroundColor: color.accent,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  browseButtonText: {
    ...type.labelLarge,
    color: color.accentText,
  },
});
