import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <AnimatedSplashOverlay />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0F0A1E' },
          animation: 'slide_from_right',
        }}
      >
        {/* Tab screens rendered via AppTabs */}
        <Stack.Screen name="index" />
        <Stack.Screen name="explore" />

        {/* Full-screen theory, quiz and results */}
        <Stack.Screen
          name="theory"
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="quiz"
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="results"
          options={{ animation: 'fade' }}
        />
      </Stack>
    </>
  );
}
