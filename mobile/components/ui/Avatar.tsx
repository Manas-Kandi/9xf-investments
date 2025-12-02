import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography } from '../../constants/theme';

interface AvatarProps {
  source?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  style?: ViewStyle;
}

/**
 * M3 Avatar
 * Circular image or initials display
 */
export function Avatar({ 
  source, 
  name, 
  size = 'md',
  icon,
  style,
}: AvatarProps) {
  const sizes = {
    sm: { container: 32, text: 12, icon: 16 },
    md: { container: 40, text: 14, icon: 20 },
    lg: { container: 56, text: 18, icon: 28 },
    xl: { container: 72, text: 24, icon: 36 },
  };

  const sizeConfig = sizes[size];

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  return (
    <View 
      style={[
        styles.container, 
        { 
          width: sizeConfig.container, 
          height: sizeConfig.container,
          borderRadius: sizeConfig.container / 2,
        },
        style,
      ]}
    >
      {source ? (
        <Image 
          source={{ uri: source }} 
          style={[
            styles.image,
            { 
              width: sizeConfig.container, 
              height: sizeConfig.container,
              borderRadius: sizeConfig.container / 2,
            },
          ]} 
        />
      ) : icon ? (
        <MaterialCommunityIcons 
          name={icon} 
          size={sizeConfig.icon} 
          color={colors.onPrimaryContainer} 
        />
      ) : name ? (
        <Text style={[styles.initials, { fontSize: sizeConfig.text }]}>
          {getInitials(name)}
        </Text>
      ) : (
        <MaterialCommunityIcons 
          name="account" 
          size={sizeConfig.icon} 
          color={colors.onPrimaryContainer} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  initials: {
    ...typography.titleMedium,
    color: colors.onPrimaryContainer,
    fontWeight: '600',
  },
});
