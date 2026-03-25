import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useRouter, type Href } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { colors, spacing, fontSize, fontWeight, radius } from '@/constants/theme';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { CUSTOM_TAB_BAR_HEIGHT } from '@/components/ui/CustomTabBar';

interface SectionCardProps {
  emoji: string;
  title: string;
  description: string;
  accentColor: string;
  onPress: () => void;
}

function SectionCard({ emoji, title, description, accentColor, onPress }: SectionCardProps) {
  return (
    <TouchableOpacity style={[styles.card, { borderLeftColor: accentColor }]} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.cardIconCircle, { backgroundColor: accentColor + '22' }]}>
        <Text style={styles.cardEmoji}>{emoji}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{description}</Text>
      </View>
      <Text style={[styles.cardArrow, { color: accentColor }]}>›</Text>
    </TouchableOpacity>
  );
}

export default function HomeTab() {
  const router = useRouter();
  const { userName, isLoggedIn } = useAuthStore();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>
              {isLoggedIn ? t('home.greeting', { name: userName ?? 'Friend' }) : t('home.guestGreeting')}
            </Text>
            <Text style={styles.appName}>LePetit.app</Text>
          </View>
          <View style={styles.headerRight}>
            <LanguageSwitcher />
          </View>
        </View>

        <Text style={styles.sectionLabel}>{t('home.explore')}</Text>

        <SectionCard
          emoji="📚"
          title={t('home.talesTitle')}
          description={t('home.talesDesc')}
          accentColor={colors.primary}
          onPress={() => router.push('/(app)/tales/tales' as Href)}
        />
        <SectionCard
          emoji="👨‍👩‍👧"
          title={t('home.parentsTitle')}
          description={t('home.parentsDesc')}
          accentColor={colors.secondary}
          onPress={() => router.push('/(app)/parents' as Href)}
        />
        <SectionCard
          emoji="🗣️"
          title={t('home.logopedTitle')}
          description={t('home.logopedDesc')}
          accentColor={colors.accent}
          onPress={() => router.push('/(app)/my-logoped' as Href)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: CUSTOM_TAB_BAR_HEIGHT + spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  greeting: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  appName: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.extrabold,
    color: colors.text,
  },
  logoutBtn: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  logoutText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  sectionLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
    padding: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardIconCircle: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardEmoji: {
    fontSize: 24,
  },
  cardBody: {
    flex: 1,
    gap: spacing.xs,
  },
  cardTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  cardDesc: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    lineHeight: 18,
  },
  cardArrow: {
    fontSize: 24,
    fontWeight: fontWeight.bold,
  },
});

