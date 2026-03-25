/**
 * CustomTabBar – a colorful floating tab bar for LePetit.app.
 *
 * Each tab has its own accent colour + gradient active bubble.
 * The `notifications` tab is intentionally excluded (accessible from More).
 * Export CUSTOM_TAB_BAR_HEIGHT so other components (e.g. MiniPlayer) can
 * position themselves correctly.
 */
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { colors, fontSize, fontWeight, radius, spacing } from '@/constants/theme';

// ─── constants ────────────────────────────────────────────────────────────────

/** Height of the icon + label area (excluding bottom safe-area inset). */
export const CUSTOM_TAB_BAR_HEIGHT = 68;

/** Tabs that should appear in the bar (notifications lives in More). */
const VISIBLE_TABS = ['tales', 'search', 'favorites', 'more'];

/** Per-tab visual config. */
const TAB_CONFIG: Record<
  string,
  {
    inactiveIcon: React.ComponentProps<typeof FontAwesome>['name'];
    activeIcon: React.ComponentProps<typeof FontAwesome>['name'];
    gradient: [string, string];
    labelKey: string;
  }
> = {
  tales: {
    inactiveIcon: 'home',
    activeIcon: 'home',
    gradient: ['#FFB300', '#F57F17'],
    labelKey: 'tabs.home',
  },
  search: {
    inactiveIcon: 'search',
    activeIcon: 'search',
    gradient: ['#29B6F6', '#0277BD'],
    labelKey: 'tabs.search',
  },
  favorites: {
    inactiveIcon: 'heart-o',
    activeIcon: 'heart',
    gradient: ['#FF6B6B', '#C62828'],
    labelKey: 'tabs.favourites',
  },
  more: {
    inactiveIcon: 'ellipsis-h',
    activeIcon: 'ellipsis-h',
    gradient: ['#BA68C8', '#6A1B9A'],
    labelKey: 'tabs.more',
  },
};

// ─── main component ───────────────────────────────────────────────────────────

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const visibleRoutes = state.routes.filter((r) => VISIBLE_TABS.includes(r.name));

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom }]}>
      <View style={styles.bar}>
        {visibleRoutes.map((route) => {
          const isFocused = state.routes[state.index]?.name === route.name;
          const config = TAB_CONFIG[route.name];
          if (!config) return null;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TabItem
              key={route.key}
              label={t(config.labelKey)}
              inactiveIcon={config.inactiveIcon}
              activeIcon={config.activeIcon}
              gradient={config.gradient}
              isFocused={isFocused}
              onPress={onPress}
            />
          );
        })}
      </View>
    </View>
  );
}

// ─── tab item ─────────────────────────────────────────────────────────────────

interface TabItemProps {
  label: string;
  inactiveIcon: React.ComponentProps<typeof FontAwesome>['name'];
  activeIcon: React.ComponentProps<typeof FontAwesome>['name'];
  gradient: [string, string];
  isFocused: boolean;
  onPress: () => void;
}

function TabItem({ label, inactiveIcon, activeIcon, gradient, isFocused, onPress }: TabItemProps) {
  // Scale animation
  const scale = useRef(new Animated.Value(isFocused ? 1 : 0.92)).current;
  // Bubble opacity/size
  const bubbleScale = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: isFocused ? 1.08 : 0.92,
        useNativeDriver: true,
        tension: 120,
        friction: 8,
      }),
      Animated.timing(bubbleScale, {
        toValue: isFocused ? 1 : 0,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [isFocused, scale, bubbleScale]);

  const accentColor = gradient[0];

  return (
    <TouchableOpacity style={styles.tabItem} onPress={onPress} activeOpacity={0.8}>
      {/* Gradient bubble (visible when active) */}
      <Animated.View style={[styles.bubbleWrapper, { transform: [{ scale: bubbleScale }] }]}>
        <LinearGradient colors={gradient} style={styles.bubble} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          {/* decorative shine */}
          <View style={styles.bubbleShine} />
        </LinearGradient>
      </Animated.View>

      {/* Icon */}
      <Animated.View style={{ transform: [{ scale }], zIndex: 1 }}>
        <FontAwesome
          name={isFocused ? activeIcon : inactiveIcon}
          size={22}
          color={isFocused ? '#fff' : accentColor + 'BB'}
        />
      </Animated.View>

      {/* Label */}
      {/*<Text*/}
      {/*  style={[*/}
      {/*    styles.label,*/}
      {/*    { color: isFocused ? accentColor : colors.tabBarInactive },*/}
      {/*    isFocused && styles.labelActive,*/}
      {/*  ]}*/}
      {/*  numberOfLines={1}>*/}
      {/*  {label}*/}
      {/*</Text>*/}

      {/* Active dot */}
      {/*{isFocused && (*/}
      {/*  <View style={[styles.activeDot, { backgroundColor: accentColor }]} />*/}
      {/*)}*/}
    </TouchableOpacity>
  );
}

// ─── styles ───────────────────────────────────────────────────────────────────

const BUBBLE_SIZE = 48;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.md,
    backgroundColor: 'transparent',
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    height: CUSTOM_TAB_BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 16,
    borderWidth: 1,
    borderColor: colors.border + '88',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: 3,
    position: 'relative',
  },
  bubbleWrapper: {
    position: 'absolute',
    top: '60%',
    marginTop: -(BUBBLE_SIZE / 2) - 6,
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: BUBBLE_SIZE / 2,
    overflow: 'hidden',
  },
  bubble: {
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: BUBBLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleShine: {
    position: 'absolute',
    top: 6,
    left: 10,
    width: BUBBLE_SIZE * 0.55,
    height: BUBBLE_SIZE * 0.28,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.30)',
    transform: [{ rotate: '-10deg' }],
  },
  label: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  labelActive: {
    fontWeight: fontWeight.bold,
  },
  activeDot: {
    position: 'absolute',
    bottom: 6,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});

