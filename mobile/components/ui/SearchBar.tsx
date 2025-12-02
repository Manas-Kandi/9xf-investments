import React from 'react';
import { View, TextInput, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, borderRadius, spacing, typography } from '../../constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  style?: ViewStyle;
}

/**
 * M3 Search Bar
 * Full-width search input with optional leading/trailing content
 */
export function SearchBar({ 
  value, 
  onChangeText, 
  placeholder = 'Search',
  onSubmit,
  leading,
  trailing,
  style,
}: SearchBarProps) {
  return (
    <View style={[styles.container, style]}>
      {leading || (
        <MaterialCommunityIcons 
          name="magnify" 
          size={24} 
          color={colors.onSurfaceVariant} 
          style={styles.leadingIcon}
        />
      )}
      
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.onSurfaceVariant}
        style={styles.input}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
      />

      {trailing}
      
      {value.length > 0 && !trailing && (
        <Pressable onPress={() => onChangeText('')} style={styles.clearButton}>
          <MaterialCommunityIcons 
            name="close" 
            size={20} 
            color={colors.onSurfaceVariant} 
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    height: 56,
  },
  leadingIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    ...typography.bodyLarge,
    color: colors.onSurface,
    padding: 0,
  },
  clearButton: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
  },
});
