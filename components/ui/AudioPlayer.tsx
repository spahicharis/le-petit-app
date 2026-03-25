/**
 * AudioPlayer – a kids-friendly audio player for tale narration.
 * Playback state lives in the global useAudioStore; this component is purely
 * a presentational controller for the current story.
 */
import React, { useCallback, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import { colors, fontSize, fontWeight, radius, spacing } from '@/constants/theme';
import { useAudioStore } from '@/store/audioStore';
import type { Story } from '@/constants/data';

// ─── helpers ────────────────────────────────────────────────────────────────

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ─── component ───────────────────────────────────────────────────────────────

interface AudioPlayerProps {
  story: Story;
}

export function AudioPlayer({ story }: AudioPlayerProps) {
  const { currentStory, isLoaded, isLoading, isPlaying, positionMs, durationMs, error, play, togglePlayPause, seek } =
    useAudioStore();
  const { t } = useTranslation();

  /** True only when THIS story is the active one in the global store. */
  const isThisStory = currentStory?.id === story.id;

  const effectiveIsPlaying = isThisStory && isPlaying;
  const effectiveIsLoading = isThisStory && isLoading;
  const effectiveIsLoaded = isThisStory && isLoaded;
  const effectivePosition = isThisStory ? positionMs : 0;
  const effectiveDuration = isThisStory ? durationMs : 0;
  const effectiveError = isThisStory ? error : null;

  // ── local seek state (only used while dragging) ──────────────────────────
  const isSeeking = useRef(false);
  const seekPct = useRef(0);
  const [seekDisplay, setSeekDisplay] = React.useState<number | null>(null);

  // ── animations ────────────────────────────────────────────────────────────
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseLoop = useRef<Animated.CompositeAnimation | null>(null);
  const note1 = useRef(new Animated.Value(0)).current;
  const note2 = useRef(new Animated.Value(0)).current;
  const note3 = useRef(new Animated.Value(0)).current;

  const startPulse = useCallback(() => {
    pulseLoop.current = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.08, duration: 600, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1,    duration: 600, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    pulseLoop.current.start();
  }, [pulseAnim]);

  const stopPulse = useCallback(() => {
    pulseLoop.current?.stop();
    pulseAnim.setValue(1);
  }, [pulseAnim]);

  const startNotes = useCallback(() => {
    const makeNote = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, { toValue: 1, duration: 900, easing: Easing.out(Easing.ease), useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0, duration: 400, useNativeDriver: true }),
        ]),
      );
    makeNote(note1, 0).start();
    makeNote(note2, 300).start();
    makeNote(note3, 600).start();
  }, [note1, note2, note3]);

  const stopNotes = useCallback(() => {
    note1.stopAnimation(() => note1.setValue(0));
    note2.stopAnimation(() => note2.setValue(0));
    note3.stopAnimation(() => note3.setValue(0));
  }, [note1, note2, note3]);

  useEffect(() => {
    if (effectiveIsPlaying) { startPulse(); startNotes(); }
    else { stopPulse(); stopNotes(); }
  }, [effectiveIsPlaying, startPulse, startNotes, stopPulse, stopNotes]);

  // ── controls ──────────────────────────────────────────────────────────────

  const handlePlayPause = useCallback(async () => {
    if (!isThisStory || (!isLoaded && !isLoading)) {
      await play(story);
    } else {
      await togglePlayPause();
    }
  }, [isThisStory, isLoaded, isLoading, play, story, togglePlayPause]);

  // ── seek bar ──────────────────────────────────────────────────────────────

  const trackWidth = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        isSeeking.current = true;
        const pct = Math.max(0, Math.min(1, evt.nativeEvent.locationX / (trackWidth.current || 1)));
        seekPct.current = pct;
        setSeekDisplay(pct);
      },
      onPanResponderMove: (evt) => {
        const pct = Math.max(0, Math.min(1, evt.nativeEvent.locationX / (trackWidth.current || 1)));
        seekPct.current = pct;
        setSeekDisplay(pct);
      },
      onPanResponderRelease: async (evt) => {
        const pct = Math.max(0, Math.min(1, evt.nativeEvent.locationX / (trackWidth.current || 1)));
        seekPct.current = pct;
        isSeeking.current = false;
        setSeekDisplay(null);
        if (effectiveDuration > 0) {
          await seek(pct * effectiveDuration);
        }
      },
    }),
  ).current;

  const displayPct =
    seekDisplay !== null
      ? seekDisplay
      : effectiveDuration > 0
        ? effectivePosition / effectiveDuration
        : 0;

  const displayPosition = seekDisplay !== null ? seekDisplay * effectiveDuration : effectivePosition;

  // ── note helper ───────────────────────────────────────────────────────────

  const noteStyle = (anim: Animated.Value, offsetX: number) => ({
    opacity: anim,
    transform: [
      { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, -22] }) },
      { translateX: offsetX },
      { scale: anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.6, 1.1, 0.8] }) },
    ],
  });

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <LinearGradient
      colors={['#FFF3E0', '#FFF8F0', '#E3F2FD']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>

      {/* Floating musical notes */}
      <View style={styles.notesContainer} pointerEvents="none">
        <Animated.Text style={[styles.noteEmoji, noteStyle(note1, -8)]}>🎵</Animated.Text>
        <Animated.Text style={[styles.noteEmoji, noteStyle(note2, 4)]}>🎶</Animated.Text>
        <Animated.Text style={[styles.noteEmoji, noteStyle(note3, -2)]}>🎵</Animated.Text>
      </View>

      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.listenLabel}>{t('audio.listenToStory')}</Text>
      </View>

      {(story.narrator || story.title) ? (
        <Text style={styles.narratorText} numberOfLines={1}>
          {story.narrator ? t('audio.narratedBy', { name: story.narrator }) : story.title}
        </Text>
      ) : null}

      {effectiveError && <Text style={styles.errorText}>{effectiveError}</Text>}

      {/* Controls */}
      <View style={styles.controlsRow}>
        <Text style={styles.timeText}>{formatTime(displayPosition)}</Text>

        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity
            style={styles.playBtn}
            onPress={handlePlayPause}
            activeOpacity={0.8}
            disabled={effectiveIsLoading}>
            <LinearGradient
              colors={effectiveIsPlaying ? ['#FF8A65', '#FF6B6B'] : ['#F9A825', '#F57F17']}
              style={styles.playBtnGradient}>
              {effectiveIsLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <FontAwesome
                  name={effectiveIsPlaying ? 'pause' : 'play'}
                  size={22}
                  color="#fff"
                  style={effectiveIsPlaying ? undefined : styles.playIcon}
                />
              )}
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.timeText}>{formatTime(effectiveDuration)}</Text>
      </View>

      {/* Seek bar */}
      <View
        style={styles.trackContainer}
        {...panResponder.panHandlers}
        onLayout={(e) => { trackWidth.current = e.nativeEvent.layout.width; }}>
        <View style={styles.track}>
          <View style={[styles.trackFill, { flex: displayPct }]} />
          <View style={[styles.trackRemaining, { flex: 1 - displayPct }]} />
        </View>
        <View
          style={[
            styles.thumb,
            { left: `${(displayPct * 100).toFixed(1)}%` as unknown as number },
          ]}
        />
      </View>

      {!effectiveIsLoaded && !effectiveIsLoading && !effectiveError && (
        <Text style={styles.hintText}>{t('audio.tapToListen')}</Text>
      )}
    </LinearGradient>
  );
}

// ─── styles ───────────────────────────────────────────────────────────────────

const PLAY_BTN_SIZE = 60;
const THUMB_SIZE = 16;

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    padding: spacing.md,
    paddingTop: spacing.lg,
    borderWidth: 1.5,
    borderColor: colors.primary + '55',
    overflow: 'hidden',
    position: 'relative',
  },
  notesContainer: {
    position: 'absolute',
    top: 10,
    right: spacing.md,
    flexDirection: 'row',
    gap: 4,
    height: 40,
    alignItems: 'flex-end',
  },
  noteEmoji: { fontSize: 18 },
  headerRow: { alignItems: 'center', marginBottom: spacing.xs },
  listenLabel: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    letterSpacing: 0.3,
  },
  narratorText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  errorText: {
    fontSize: fontSize.sm,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  timeText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textMuted,
    minWidth: 38,
    textAlign: 'center',
  },
  playBtn: {
    width: PLAY_BTN_SIZE,
    height: PLAY_BTN_SIZE,
    borderRadius: PLAY_BTN_SIZE / 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 8,
  },
  playBtnGradient: {
    width: PLAY_BTN_SIZE,
    height: PLAY_BTN_SIZE,
    borderRadius: PLAY_BTN_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: { marginLeft: 4 },
  trackContainer: {
    height: THUMB_SIZE + 8,
    justifyContent: 'center',
    marginHorizontal: spacing.xs,
    marginBottom: spacing.xs,
  },
  track: {
    flexDirection: 'row',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  trackFill: { backgroundColor: colors.primary, borderRadius: 3 },
  trackRemaining: { backgroundColor: colors.border, borderRadius: 3 },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: colors.primary,
    borderWidth: 2.5,
    borderColor: '#fff',
    marginLeft: -(THUMB_SIZE / 2),
    top: (6 - THUMB_SIZE) / 2 + 4,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 4,
  },
  hintText: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});

