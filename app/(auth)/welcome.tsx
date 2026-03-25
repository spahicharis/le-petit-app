import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useRouter, type Href } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { colors, spacing, fontSize, fontWeight, radius } from '@/constants/theme';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export default function WelcomeScreen() {
  const router = useRouter();
  const { continueAsGuest } = useAuthStore();
  const { t } = useTranslation();

  const handleContinueAsGuest = () => { continueAsGuest(); };
  const handleSignIn = () => { router.push('/(auth)/login' as Href); };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Language switcher – top right */}
      <View style={styles.topBar}>
        <LanguageSwitcher />
      </View>

      {/* Hero area */}
      <View style={styles.hero}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>📖</Text>
        </View>
        <Text style={styles.appName}>LePetit.app</Text>
        <Text style={styles.tagline}>{t('welcome.tagline')}</Text>
      </View>

      {/* Features */}
      <View style={styles.features}>
        <FeatureRow icon="🦁" text={t('welcome.feature1')} />
        <FeatureRow icon="🌙" text={t('welcome.feature2')} />
        <FeatureRow icon="🎧" text={t('welcome.feature3')} />
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleContinueAsGuest} activeOpacity={0.85}>
          <Text style={styles.primaryBtnText}>{t('welcome.continueWithoutLogin')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={handleSignIn} activeOpacity={0.85}>
          <Text style={styles.secondaryBtnText}>{t('welcome.signIn')}</Text>
        </TouchableOpacity>

        <Text style={styles.hint}>{t('welcome.signInHint')}</Text>
      </View>
    </SafeAreaView>
  );
}

function FeatureRow({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.featureRow}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  topBar: {
    alignItems: 'flex-end',
    paddingTop: spacing.sm,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xxl,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoEmoji: {
    fontSize: 48,
  },
  appName: {
    fontSize: fontSize.hero,
    fontWeight: fontWeight.extrabold,
    color: colors.text,
    marginBottom: spacing.sm,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: fontSize.lg,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 26,
  },
  features: {
    paddingVertical: spacing.xl,
    gap: spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureIcon: {
    fontSize: 22,
  },
  featureText: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: fontWeight.medium,
  },
  actions: {
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing.md + 2,
    alignItems: 'center',
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  primaryBtnText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  secondaryBtn: {
    borderRadius: radius.lg,
    paddingVertical: spacing.md + 2,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  secondaryBtnText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  hint: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
});

