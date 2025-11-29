import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { useAppStore } from '../../store';

export default function AccountScreen() {
  const router = useRouter();
  const { user, fundingSources, logout } = useAppStore();

  const handleLogout = () => {
    Alert.alert(
      'Sign out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign out',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/');
          },
        },
      ]
    );
  };

  const menuSections = [
    {
      title: 'Profile',
      items: [
        {
          icon: 'person-outline' as const,
          label: 'Edit profile',
          onPress: () => router.push('/account/edit-profile'),
        },
        {
          icon: 'shield-checkmark-outline' as const,
          label: 'KYC status',
          value: user?.kyc_status === 'verified' ? 'Verified' : 'Pending',
          valueColor: user?.kyc_status === 'verified' ? colors.success : colors.warning,
        },
      ],
    },
    {
      title: 'Funding',
      items: [
        {
          icon: 'card-outline' as const,
          label: 'Payment methods',
          value: fundingSources.length > 0 ? `${fundingSources.length} linked` : 'None',
          onPress: () => router.push('/account/payment-methods'),
        },
      ],
    },
    {
      title: 'Learn',
      items: [
        {
          icon: 'information-circle-outline' as const,
          label: 'How it works',
          onPress: () => router.push('/how-it-works'),
        },
      ],
    },
    {
      title: 'Documents',
      items: [
        {
          icon: 'document-text-outline' as const,
          label: 'Terms of use',
          onPress: () => router.push('/terms-of-use'),
        },
        {
          icon: 'alert-circle-outline' as const,
          label: 'Risk disclosure',
          onPress: () => router.push('/risk-disclosure'),
        },
        {
          icon: 'lock-closed-outline' as const,
          label: 'Privacy policy',
          onPress: () => router.push('/privacy-policy'),
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: 'notifications-outline' as const,
          label: 'Investment updates',
          toggle: true,
          value: true,
        },
        {
          icon: 'megaphone-outline' as const,
          label: 'New deals',
          toggle: true,
          value: true,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: 'help-circle-outline' as const,
          label: 'Help & FAQ',
          onPress: () => router.push('/help'),
        },
        {
          icon: 'chatbubble-outline' as const,
          label: 'Contact support',
          onPress: () => router.push('/help/contact'),
        },
      ],
    },
    {
      title: 'For Founders',
      items: [
        {
          icon: 'rocket-outline' as const,
          label: "I'm a founder looking to raise",
          onPress: () => router.push('/founders/apply'),
          highlight: true,
        },
      ],
    },
    {
      title: 'For VCs',
      items: [
        {
          icon: 'business-outline' as const,
          label: "I'm a VC or fund manager",
          onPress: () => router.push('/(vc)/apply'),
          highlight: true,
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Account</Text>
        </View>

        {/* User Info */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.email?.charAt(0).toUpperCase() || '?'}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userEmail}>{user?.email || 'Not signed in'}</Text>
            <Text style={styles.userStatus}>
              {user?.kyc_status === 'verified' ? 'Verified investor' : 'Pending verification'}
            </Text>
          </View>
        </View>

        {/* Menu Sections */}
        {menuSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.menuItem,
                    index < section.items.length - 1 && styles.menuItemBorder,
                  ]}
                  onPress={item.onPress}
                  disabled={!item.onPress}
                >
                  <View style={styles.menuItemLeft}>
                    <Ionicons
                      name={item.icon}
                      size={22}
                      color={item.highlight ? colors.primary : colors.textSecondary}
                    />
                    <Text
                      style={[
                        styles.menuItemLabel,
                        item.highlight && styles.menuItemLabelHighlight,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </View>
                  <View style={styles.menuItemRight}>
                    {item.value && (
                      <Text
                        style={[
                          styles.menuItemValue,
                          item.valueColor && { color: item.valueColor },
                        ]}
                      >
                        {item.value}
                      </Text>
                    )}
                    {item.onPress && (
                      <Ionicons
                        name="chevron-forward"
                        size={18}
                        color={colors.textMuted}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color={colors.error} />
          <Text style={styles.logoutText}>Sign out</Text>
        </TouchableOpacity>

        {/* Version */}
        <Text style={styles.version}>Version 1.0.0</Text>
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
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    color: colors.white,
    fontSize: fontSize.xl,
    fontWeight: '600',
  },
  userInfo: {
    flex: 1,
  },
  userEmail: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  userStatus: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textMuted,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuItemLabel: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  menuItemLabelHighlight: {
    color: colors.primary,
    fontWeight: '500',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  menuItemValue: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.lg,
    marginTop: spacing.md,
  },
  logoutText: {
    fontSize: fontSize.md,
    color: colors.error,
    fontWeight: '500',
  },
  version: {
    textAlign: 'center',
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
});
