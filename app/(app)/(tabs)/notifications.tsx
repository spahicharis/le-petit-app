import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, fontSize, fontWeight } from '@/constants/theme';

export default function NotificationsTab() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.empty}>🔔 No notifications yet.</Text>
        <Text style={styles.hint}>
          We will notify you when new stories are added or when your favourites are updated.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: {
    flex: 1,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.extrabold,
    color: colors.text,
    marginBottom: spacing.xl,
  },
  empty: { fontSize: fontSize.xl, marginBottom: spacing.md },
  hint: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
});

