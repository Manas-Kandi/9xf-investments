import { Stack } from 'expo-router';
import { colors } from '../../constants/theme';

export default function VCLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="apply" />
      <Stack.Screen name="console" />
    </Stack>
  );
}
