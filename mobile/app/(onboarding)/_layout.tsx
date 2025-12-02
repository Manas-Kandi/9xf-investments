import { Stack } from 'expo-router';
import { colors } from '../../constants/theme';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="kyc-intro" />
      <Stack.Screen name="kyc-details" />
      <Stack.Screen name="funding" />
      <Stack.Screen name="terms" />
    </Stack>
  );
}
