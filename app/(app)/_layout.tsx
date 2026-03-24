import { Stack, useRouter, type Href } from 'expo-router';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function AppLayout() {
  const { hasSession } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!hasSession) {
      router.replace('/(auth)/welcome' as Href);
    }
  }, [hasSession, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="tales/tales"
        options={{ headerShown: true, title: 'Tales', headerBackTitle: 'Home' }}
      />
      <Stack.Screen
        name="tales/[subcategory]"
        options={{ headerShown: true, headerBackTitle: 'Tales' }}
      />
      <Stack.Screen
        name="story/[storyId]"
        options={{ headerShown: true, headerBackTitle: 'Back' }}
      />
      <Stack.Screen
        name="parents"
        options={{ headerShown: true, title: 'For Parents', headerBackTitle: 'Home' }}
      />
      <Stack.Screen
        name="my-logoped"
        options={{ headerShown: true, title: 'My Logoped', headerBackTitle: 'Home' }}
      />
    </Stack>
  );
}

