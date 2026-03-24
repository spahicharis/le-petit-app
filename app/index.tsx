import React, { useState } from 'react';
import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { AppSplashScreen } from '@/components/SplashScreen';

/**
 * Root entry point.
 * Shows the animated splash screen first, then redirects based on session state.
 */
export default function Index() {
  const { hasSession } = useAuthStore();
  const [splashDone, setSplashDone] = useState(false);

  if (!splashDone) {
    return <AppSplashScreen onFinish={() => setSplashDone(true)} />;
  }

  return <Redirect href={hasSession ? '/(app)/(tabs)/tales' : '/(auth)/welcome'} />;
}
