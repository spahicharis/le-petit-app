import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { CustomTabBar } from '@/components/ui/CustomTabBar';

export const unstable_settings = {
  initialRouteName: 'tales',
};

export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen name="tales" options={{ title: t('tabs.home') }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
      <Tabs.Screen name="search" options={{ title: t('tabs.search') }} />
      <Tabs.Screen name="favorites" options={{ title: t('tabs.favourites') }} />
      <Tabs.Screen name="more" options={{ title: t('tabs.more') }} />
    </Tabs>
  );
}
