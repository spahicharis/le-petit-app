import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, fontWeight, spacing } from '@/constants/theme';

/** Gradient colours – warm amber → coral, matching the app palette */
export const HEADER_GRADIENT: [string, string, ...string[]] = [
  '#aca29c',
  'rgba(255,154,92,0.49)',
  'rgba(255,154,92,0.49)',
  // colors.background,
  // colors.background,
  // colors.background,
  // 'transparent',
  // 'transparent',
  // 'transparent',
];

/** Bottom-fade colours – amber → transparent, for the soft dissolve beneath the header */
const BOTTOM_FADE: [string, string] = ['rgba(249, 168, 37, 0.25)', 'transparent'];

export function GradientHeader({ options, navigation, route }: NativeStackHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const canGoBack = navigation.canGoBack();
  const title = options.title ?? (route.name as string);

  const topPadding = insets.top + (Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0);

  return (
    // Outer wrapper with overflow:visible so the bottom fade can spill below the header
    <View style={styles.wrapper}>
      <LinearGradient
        colors={HEADER_GRADIENT}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.container, { paddingTop: topPadding }]}>

        {/* Back button */}
        <View style={styles.sideSlot}>
          {canGoBack && (
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => router.back()}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              activeOpacity={0.7}>
              <Text style={styles.backIcon}>‹</Text>
              {options.headerBackTitle ? (
                <Text style={styles.backLabel} numberOfLines={1}>
                  {options.headerBackTitle}
                </Text>
              ) : null}
            </TouchableOpacity>
          )}
        </View>

        {/* Title */}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        {/* Right side spacer (keeps title centred) */}
        <View style={styles.sideSlot} />
      </LinearGradient>

      {/* Bottom opacity fade – dissolves the header edge into the content below */}
      {/*<LinearGradient*/}
      {/*  colors={BOTTOM_FADE}*/}
      {/*  start={{ x: 0, y: 0 }}*/}
      {/*  end={{ x: 0, y: 1 }}*/}
      {/*  style={styles.bottomFade}*/}
      {/*  pointerEvents="none"*/}
      {/*/>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'visible',
    zIndex: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
    minHeight: 56,
    shadowColor: '#F9A825',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  sideSlot: {
    width: 80,
    justifyContent: 'center',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  backIcon: {
    fontSize: 32,
    color: colors.textLight,
    lineHeight: 34,
    fontWeight: fontWeight.regular,
    marginTop: -2,
  },
  backLabel: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    fontWeight: fontWeight.semibold,
    maxWidth: 60,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textLight,
    letterSpacing: 0.2,
  },
  bottomFade: {
    position: 'absolute',
    bottom: -18,
    left: 0,
    right: 0,
    height: 22,
  },
});
