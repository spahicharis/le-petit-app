import React, { useState } from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter, type Href } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Constants from 'expo-constants';
import { useAuthStore } from '@/store/authStore';
import { colors, fontSize, fontWeight, radius, spacing } from '@/constants/theme';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { CUSTOM_TAB_BAR_HEIGHT } from '@/components/ui/CustomTabBar';

// ─── types ────────────────────────────────────────────────────────────────────

interface MenuItem {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  iconColor?: string;
  label: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  destructive?: boolean;
  onPress: () => void;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

// ─── component ────────────────────────────────────────────────────────────────

export default function MoreTab() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isLoggedIn, userName, logout } = useAuthStore();

  const appVersion = Constants.expoConfig?.version ?? '1.0.0';

  const [updateDone, setUpdateDone] = useState(false);

  // ── handlers ────────────────────────────────────────────────────────────

  const handleSignIn = () => router.push('/(auth)/login' as Href);

  const handleSignOut = () => {
    Alert.alert(
      t('more.signOut'),
      undefined,
      [
        { text: t('more.signOut'), style: 'destructive', onPress: logout },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  const handleSubscription = () => {
    Alert.alert(
      t('more.subscription'),
      t('more.subscriptionSoon'),
    );
  };

  const handleUpdateContent = () => {
    setUpdateDone(true);
    setTimeout(() => setUpdateDone(false), 3000);
  };

  const handleFeedback = () => {
    Linking.openURL('mailto:hello@lepetit.app?subject=LePetit.app%20Feedback').catch(() =>
      Alert.alert('', 'hello@lepetit.app'),
    );
  };

  const handleReportBug = () => {
    Linking.openURL('mailto:hello@lepetit.app?subject=LePetit.app%20Bug%20Report').catch(() =>
      Alert.alert('', 'hello@lepetit.app'),
    );
  };

  const handleAbout = () => {
    Alert.alert(
      t('more.about'),
      t('more.aboutMessage', { version: appVersion }),
    );
  };

  const handlePrivacy = () => {
    Alert.alert(t('more.privacyPolicy'), t('more.privacySoon'));
  };

  // ── sections ─────────────────────────────────────────────────────────────

  const sections: MenuSection[] = [
    // Notifications
    {
      title: t('tabs.notifications'),
      items: [
        {
          icon: 'bell',
          iconColor: colors.accent,
          label: t('tabs.notifications'),
          subtitle: t('more.notificationsSubtitle'),
          onPress: () => router.push('/notifications' as Href),
        },
      ],
    },
    // Account — sign-in for guests, sign-out for authenticated users
    {
      title: t('more.sectionAccount'),
      items: isLoggedIn
        ? [
            {
              icon: 'sign-out',
              iconColor: colors.secondary,
              label: t('more.signOut'),
              destructive: true,
              onPress: handleSignOut,
            },
          ]
        : [
            {
              icon: 'sign-in',
              iconColor: colors.primary,
              label: t('more.signIn'),
              subtitle: t('more.signInSubtitle'),
              onPress: handleSignIn,
            },
          ],
    },
    // Premium
    {
      title: t('more.sectionPremium'),
      items: [
        {
          icon: 'star',
          iconColor: colors.primary,
          label: t('more.subscription'),
          badge: isLoggedIn ? t('more.subscriptionBadgePremium') : t('more.subscriptionBadgeFree'),
          badgeColor: isLoggedIn ? colors.success : colors.textMuted,
          onPress: handleSubscription,
        },
        {
          icon: 'refresh',
          iconColor: colors.accent,
          label: updateDone ? t('more.updateContentDone') : t('more.updateContent'),
          onPress: handleUpdateContent,
        },
      ],
    },
    // Support
    {
      title: t('more.sectionSupport'),
      items: [
        {
          icon: 'envelope',
          iconColor: colors.accent,
          label: t('more.feedback'),
          onPress: handleFeedback,
        },
        {
          icon: 'bug',
          iconColor: colors.secondary,
          label: t('more.reportBug'),
          onPress: handleReportBug,
        },
      ],
    },
    // Info
    {
      title: t('more.sectionInfo'),
      items: [
        {
          icon: 'info-circle',
          iconColor: colors.primary,
          label: t('more.about'),
          subtitle: t('more.version', { version: appVersion }),
          onPress: handleAbout,
        },
        {
          icon: 'lock',
          iconColor: colors.textMuted,
          label: t('more.privacyPolicy'),
          onPress: handlePrivacy,
        },
      ],
    },
  ];

  // ── render ───────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>

        {/* Header row */}
        <View style={styles.header}>
          <Text style={styles.pageTitle}>{t('more.title')}</Text>
          <LanguageSwitcher />
        </View>

        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={[styles.avatar, { backgroundColor: isLoggedIn ? colors.primary + '33' : colors.border }]}>
            <Text style={styles.avatarEmoji}>{isLoggedIn ? '😊' : '👤'}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {isLoggedIn ? (userName ?? t('more.guest')) : t('more.guest')}
            </Text>
            <Text style={styles.profileSubtitle}>
              {isLoggedIn
                ? `${t('more.signedInAs')} ${userName ?? ''}`
                : t('more.guestSubtitle')}
            </Text>
          </View>
          {isLoggedIn && (
            <View style={styles.premiumBadge}>
              <FontAwesome name="star" size={10} color={colors.primary} />
              <Text style={styles.premiumBadgeText}>{t('more.subscriptionBadgeFree')}</Text>
            </View>
          )}
        </View>

        {/* Menu sections */}
        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, index) => (
                <React.Fragment key={item.label}>
                  <MenuRow item={item} />
                  {index < section.items.length - 1 && (
                    <View style={styles.separator} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.footer}>LePetit.app · {t('more.version', { version: appVersion })}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── menu row ─────────────────────────────────────────────────────────────────

function MenuRow({ item }: { item: MenuItem }) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={item.onPress}
      activeOpacity={0.7}>

      {/* Icon */}
      <View style={[styles.rowIcon, { backgroundColor: (item.iconColor ?? colors.textMuted) + '18' }]}>
        <FontAwesome
          name={item.icon}
          size={16}
          color={item.destructive ? colors.secondary : (item.iconColor ?? colors.textMuted)}
        />
      </View>

      {/* Labels */}
      <View style={styles.rowBody}>
        <Text style={[styles.rowLabel, item.destructive && styles.rowLabelDestructive]}>
          {item.label}
        </Text>
        {item.subtitle ? (
          <Text style={styles.rowSubtitle} numberOfLines={1}>{item.subtitle}</Text>
        ) : null}
      </View>

      {/* Badge or chevron */}
      {item.badge ? (
        <View style={[styles.badge, { backgroundColor: (item.badgeColor ?? colors.textMuted) + '22' }]}>
          <Text style={[styles.badgeText, { color: item.badgeColor ?? colors.textMuted }]}>
            {item.badge}
          </Text>
        </View>
      ) : (
        <FontAwesome name="chevron-right" size={12} color={colors.border} />
      )}
    </TouchableOpacity>
  );
}

// ─── styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    paddingHorizontal: spacing.lg,
    paddingBottom: CUSTOM_TAB_BAR_HEIGHT + spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  pageTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.extrabold,
    color: colors.text,
  },
  // ── profile card ──
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 26,
  },
  profileInfo: {
    flex: 1,
    gap: 2,
  },
  profileName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  profileSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primary + '22',
    borderRadius: radius.full,
    paddingVertical: 3,
    paddingHorizontal: spacing.sm,
  },
  premiumBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  // ── section ──
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 52 + spacing.md * 2,
  },
  // ── row ──
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    gap: spacing.md,
    minHeight: 54,
  },
  rowIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBody: {
    flex: 1,
    gap: 2,
  },
  rowLabel: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.text,
  },
  rowLabelDestructive: {
    color: colors.secondary,
  },
  rowSubtitle: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  badge: {
    borderRadius: radius.full,
    paddingVertical: 3,
    paddingHorizontal: spacing.sm,
  },
  badgeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
  },
  // ── footer ──
  footer: {
    textAlign: 'center',
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.md,
  },
});

