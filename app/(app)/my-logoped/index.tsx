import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, fontSize, fontWeight } from '@/constants/theme';

export default function MyLogopedScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🗣️</Text>
        <Text style={styles.title}>My Logoped</Text>
        <Text style={styles.subtitle}>Coming soon</Text>
        <Text style={styles.body}>
          Personalised speech and language exercises, progress tracking, and guidance
          from speech therapists will be available in a future update.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  emoji: { fontSize: 64, marginBottom: spacing.sm },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.extrabold,
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.accent,
  },
  body: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
});

