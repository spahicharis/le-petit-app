import { Stack } from 'expo-router';
import { GradientHeader } from '@/components/ui/GradientHeader';

export default function ParentsLayout() {
  return <Stack screenOptions={{
    title: 'For Parents',
    headerBackTitle: 'Home',
    header: (props) => <GradientHeader {...props} />,
  }} />;
}
