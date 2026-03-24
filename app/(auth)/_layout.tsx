import { Stack, useRouter, type Href } from 'expo-router';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export const unstable_settings = {
  initialRouteName: 'welcome',
};

export default function AuthLayout() {
  const { hasSession } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (hasSession) {
      router.replace('/(app)/(tabs)/tales' as Href);
    }
  }, [hasSession, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="login" />
    </Stack>
  );
}
