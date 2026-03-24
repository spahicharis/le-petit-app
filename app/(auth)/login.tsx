import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import { colors, spacing, fontSize, fontWeight, radius } from '@/constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const { loginWithProvider } = useAuthStore();

  const handleProvider = (provider: 'apple' | 'google') => {
    loginWithProvider(provider);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Back */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>
          Save your favourites and unlock the full story library.
        </Text>

        {/* Apple Sign-In */}
        <TouchableOpacity
          style={[styles.providerBtn, styles.appleBtn]}
          onPress={() => handleProvider('apple')}
          activeOpacity={0.85}>
          <Text style={styles.providerIcon}></Text>
          <Text style={[styles.providerText, styles.appleText]}>
            Continue with Apple
          </Text>
        </TouchableOpacity>

        {/* Google Sign-In */}
        <TouchableOpacity
          style={[styles.providerBtn, styles.googleBtn]}
          onPress={() => handleProvider('google')}
          activeOpacity={0.85}>
          <Text style={styles.providerIcon}>G</Text>
          <Text style={[styles.providerText, styles.googleText]}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>coming soon</Text>
          <View style={styles.dividerLine} />
        </View>

        <Text style={styles.note}>
          Real authentication will be available in a future update. For now, sign-in flows are placeholders.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  backBtn: {
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  backText: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: fontWeight.semibold,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.md,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.extrabold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  providerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    borderWidth: 1.5,
  },
  appleBtn: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  googleBtn: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  providerIcon: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.surface,
  },
  providerText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  appleText: {
    color: colors.surface,
  },
  googleText: {
    color: colors.text,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginVertical: spacing.xs,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  note: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
});

