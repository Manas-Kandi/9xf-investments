import React from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, borderRadius, spacing, typography } from '../../constants/theme';

interface ListItemProps {
  headline: string;
  supportingText?: string;
  overline?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

interface ListItemLeadingProps {
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  avatar?: string;
  image?: string;
  children?: React.ReactNode;
}

interface ListItemTrailingProps {
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  text?: string;
  children?: React.ReactNode;
}

/**
 * M3 List Item Leading Content
 */
export function ListItemLeading({ icon, children }: ListItemLeadingProps) {
  if (children) return <>{children}</>;
  
  if (icon) {
    return (
      <View style={styles.leadingIcon}>
        <MaterialCommunityIcons name={icon} size={24} color={colors.onSurfaceVariant} />
      </View>
    );
  }

  return null;
}

/**
 * M3 List Item Trailing Content
 */
export function ListItemTrailing({ icon, text, children }: ListItemTrailingProps) {
  if (children) return <>{children}</>;

  if (text) {
    return <Text style={styles.trailingText}>{text}</Text>;
  }

  if (icon) {
    return (
      <MaterialCommunityIcons name={icon} size={24} color={colors.onSurfaceVariant} />
    );
  }

  return null;
}

/**
 * M3 List Item
 * Standard list item with optional leading/trailing content
 */
export function ListItem({ 
  headline, 
  supportingText, 
  overline,
  leading,
  trailing,
  onPress,
  style,
}: ListItemProps) {
  const content = (
    <View style={[styles.listItem, style]}>
      {leading && <View style={styles.leading}>{leading}</View>}
      
      <View style={styles.content}>
        {overline && <Text style={styles.overline}>{overline}</Text>}
        <Text style={styles.headline}>{headline}</Text>
        {supportingText && (
          <Text style={styles.supportingText} numberOfLines={2}>
            {supportingText}
          </Text>
        )}
      </View>

      {trailing && <View style={styles.trailing}>{trailing}</View>}
    </View>
  );

  if (onPress) {
    return (
      <Pressable 
        onPress={onPress}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 56,
  },
  pressed: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  leading: {
    marginRight: spacing.md,
  },
  leadingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  overline: {
    ...typography.labelSmall,
    color: colors.onSurfaceVariant,
    marginBottom: 2,
  },
  headline: {
    ...typography.bodyLarge,
    color: colors.onSurface,
  },
  supportingText: {
    ...typography.bodyMedium,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  trailing: {
    marginLeft: spacing.md,
  },
  trailingText: {
    ...typography.labelSmall,
    color: colors.onSurfaceVariant,
  },
});
