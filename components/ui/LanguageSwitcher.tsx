/**
 * LanguageSwitcher – a small pill button that toggles between EN and BS.
 * Uses i18n.changeLanguage() which causes all useTranslation() hooks to re-render.
 */
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import i18n, { LOCALE_LABELS, SUPPORTED_LOCALES, type SupportedLocale } from '@/constants/i18n';
import { colors, fontSize, fontWeight, radius, spacing } from '@/constants/theme';

interface Props {
  /** 'light' for use on dark/gradient backgrounds, 'dark' for light backgrounds (default). */
  variant?: 'light' | 'dark';
}

export function LanguageSwitcher({ variant = 'dark' }: Props) {
  const [current, setCurrent] = useState<SupportedLocale>(
    (i18n.language as SupportedLocale) ?? 'en',
  );

  const handlePress = () => {
    const next = SUPPORTED_LOCALES[(SUPPORTED_LOCALES.indexOf(current) + 1) % SUPPORTED_LOCALES.length];
    i18n.changeLanguage(next);
    setCurrent(next);
  };

  const isLight = variant === 'light';

  return (
    <TouchableOpacity
      style={[styles.pill, isLight ? styles.pillLight : styles.pillDark]}
      onPress={handlePress}
      activeOpacity={0.75}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
      <View style={styles.row}>
        {SUPPORTED_LOCALES.map((locale) => (
          <Text
            key={locale}
            style={[
              styles.label,
              isLight ? styles.labelLight : styles.labelDark,
              locale === current && (isLight ? styles.activeLabelLight : styles.activeLabelDark),
            ]}>
            {LOCALE_LABELS[locale]}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: radius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
  },
  pillDark: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  pillLight: {
    backgroundColor: 'rgba(255,255,255,0.20)',
    borderColor: 'rgba(255,255,255,0.40)',
  },
  row: {
    flexDirection: 'row',
    gap: spacing.xs,
    alignItems: 'center',
  },
  label: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  labelDark: {
    color: colors.textMuted,
  },
  labelLight: {
    color: 'rgba(255,255,255,0.65)',
  },
  activeLabelDark: {
    color: colors.primary,
    fontWeight: fontWeight.extrabold,
  },
  activeLabelLight: {
    color: '#fff',
    fontWeight: fontWeight.extrabold,
  },
});

