/**
 * MiniPlayer – a persistent floating mini audio player.
 *
 * Renders as an absolute overlay above the tab bar (or safe-area on stack
 * screens).  Slides in/out whenever a story is loaded in useAudioStore.
 * Hidden automatically when the user is already on the currently-playing
 * story's detail screen (they have the full player there).
 */
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import { useAudioStore } from '@/store/audioStore';
import { CUSTOM_TAB_BAR_HEIGHT } from '@/components/ui/CustomTabBar';
import { colors, fontSize, fontWeight, radius, spacing } from '@/constants/theme';

// Standard React Navigation tab bar height (without safe area).
const MINI_PLAYER_HEIGHT = 68;

export function MiniPlayer() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const { currentStory, isPlaying, isLoading, positionMs, durationMs, togglePlayPause, stop } =
    useAudioStore();

  // ── visibility logic ──────────────────────────────────────────────────────

  /** The four bottom-tab screens – mini player must clear the tab bar here. */
  const TAB_PATHS = ['/tales', '/notifications', '/search', '/favorites'];
  const isOnTabScreen = TAB_PATHS.includes(pathname);

  /** Hide when already viewing the full player for this story. */
  const isOnCurrentStoryScreen =
    currentStory != null && pathname === `/story/${currentStory.id}`;

  const shouldShow = currentStory != null && !isOnCurrentStoryScreen;

  // ── slide animation ───────────────────────────────────────────────────────

  const slideY = useRef(new Animated.Value(MINI_PLAYER_HEIGHT + 20)).current;

  useEffect(() => {
    Animated.spring(slideY, {
      toValue: shouldShow ? 0 : MINI_PLAYER_HEIGHT + 20,
      useNativeDriver: true,
      tension: 60,
      friction: 12,
    }).start();
  }, [shouldShow, slideY]);

  // ── bottom offset ─────────────────────────────────────────────────────────

  const bottomOffset = isOnTabScreen
    ? CUSTOM_TAB_BAR_HEIGHT + insets.bottom + spacing.sm
    : insets.bottom + spacing.sm;

  // ── progress ──────────────────────────────────────────────────────────────

  const progress = durationMs > 0 ? positionMs / durationMs : 0;

  // ── handlers ──────────────────────────────────────────────────────────────

  const handleBodyPress = () => {
    if (!currentStory) return;
    router.push(`/story/${currentStory.id}` as never);
  };

  const handlePlayPause = () => {
    togglePlayPause();
  };

  const handleStop = () => {
    stop();
  };

  // ── render ────────────────────────────────────────────────────────────────

  if (!currentStory) return null;

  return (
    <Animated.View
      style={[
        styles.wrapper,
        { bottom: bottomOffset, transform: [{ translateY: slideY }] },
      ]}
      pointerEvents={shouldShow ? 'box-none' : 'none'}>
      <LinearGradient
        colors={['#FFFFFF', '#FFF8F0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}>

        {/* Progress bar – thin line at very top */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { flex: progress }]} />
          <View style={[styles.progressRemain, { flex: 1 - progress }]} />
        </View>

        {/* Row content */}
        <Pressable style={styles.row} onPress={handleBodyPress} android_ripple={{ color: '#0001' }}>

          {/* Cover or emoji */}
          {currentStory.image ? (
            <Image source={{ uri: currentStory.image }} style={styles.cover} />
          ) : (
            <View style={[styles.cover, styles.coverFallback]}>
              <Text style={styles.coverEmoji}>📖</Text>
            </View>
          )}

          {/* Title + narrator */}
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={1}>
              {currentStory.title}
            </Text>
            {currentStory.narrator ? (
              <Text style={styles.narrator} numberOfLines={1}>
                🎙 {currentStory.narrator}
              </Text>
            ) : (
              <Text style={styles.narrator}>{t('audio.tapToOpen')}</Text>
            )}
          </View>

          {/* Play / pause */}
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handlePlayPause}
            hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}>
            <LinearGradient
              colors={isPlaying ? ['#FF8A65', '#FF6B6B'] : ['#F9A825', '#F57F17']}
              style={styles.actionBtnGradient}>
              {isLoading ? (
                <FontAwesome name="circle-o-notch" size={16} color="#fff" />
              ) : (
                <FontAwesome
                  name={isPlaying ? 'pause' : 'play'}
                  size={16}
                  color="#fff"
                  style={isPlaying ? undefined : { marginLeft: 2 }}
                />
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Stop / dismiss */}
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={handleStop}
            hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}>
            <FontAwesome name="times" size={14} color={colors.textMuted} />
          </TouchableOpacity>
        </Pressable>
      </LinearGradient>
    </Animated.View>
  );
}

// ─── styles ───────────────────────────────────────────────────────────────────

const ACTION_BTN = 36;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: spacing.sm,
    right: spacing.sm,
    height: MINI_PLAYER_HEIGHT,
    borderRadius: radius.lg,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 12,
    zIndex: 999,
  },
  container: {
    flex: 1,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  progressTrack: {
    flexDirection: 'row',
    height: 3,
  },
  progressFill: {
    backgroundColor: colors.primary,
  },
  progressRemain: {
    backgroundColor: colors.border,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    gap: spacing.sm,
  },
  cover: {
    width: 42,
    height: 42,
    borderRadius: radius.sm,
  },
  coverFallback: {
    backgroundColor: colors.primary + '22',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverEmoji: {
    fontSize: 20,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  narrator: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  actionBtn: {
    width: ACTION_BTN,
    height: ACTION_BTN,
    borderRadius: ACTION_BTN / 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  actionBtnGradient: {
    width: ACTION_BTN,
    height: ACTION_BTN,
    borderRadius: ACTION_BTN / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

