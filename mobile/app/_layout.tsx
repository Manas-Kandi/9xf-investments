import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { colors } from '../constants/theme';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen after app is ready
    SplashScreen.hideAsync();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(onboarding)" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="deal/[slug]" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="invest/[slug]" options={{ animation: 'slide_from_bottom', presentation: 'modal' }} />
        <Stack.Screen name="(vc)" />
      </Stack>
    </View>
  );
}
