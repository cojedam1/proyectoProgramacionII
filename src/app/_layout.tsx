import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { View, ActivityIndicator } from 'react-native';
import { Session } from '@supabase/supabase-js';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { supabase } from '@/lib/supabase';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setInitialized(true);
      })
      .catch((err) => {
        console.warn('Supabase session fetch error:', err);
        setInitialized(true);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === 'login';

    if (!session && !inAuthGroup) {
      router.replace('/login');
    } else if (session && inAuthGroup) {
      router.replace('/');
    }
  }, [session, initialized, segments]);

  return (
    <>
      <AnimatedSplashOverlay />
      {!initialized ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0F0A1E' }}>
          <ActivityIndicator size="large" color="#6C47FF" />
        </View>
      ) : (
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#0F0A1E' },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="theory" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="quiz" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="results" options={{ animation: 'fade' }} />
          <Stack.Screen name="login" options={{ animation: 'fade' }} />
        </Stack>
      )}
    </>
  );
}
