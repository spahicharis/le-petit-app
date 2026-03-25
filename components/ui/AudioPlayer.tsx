/**
 * AudioPlayer – a kids-friendly audio player for tale narration.
 * Uses expo-av for playback.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { Audio, AVPlaybackStatus, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors, fontSize, fontWeight, radius, spacing } from '@/constants/theme';

// ─── helpers ────────────────────────────────────────────────────────────────

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ─── types ───────────────────────────────────────────────────────────────────

interface AudioPlayerProps {
  audioUrl: string;
  title?: string;
  narrator?: string | null;
}

// ─── component ───────────────────────────────────────────────────────────────

export function AudioPlayer({ audioUrl, title, narrator }: AudioPlayerProps) {
  const soundRef = useRef<Audio.Sound | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMs, setPositionMs] = useState(0);
  const [durationMs, setDurationMs] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekPercent, setSeekPercent] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Pulse animation for the play button while playing
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseLoop = useRef<Animated.CompositeAnimation | null>(null);

  // Note-bounce animations (decorative notes around the player)
  const note1Anim = useRef(new Animated.Value(0)).current;
  const note2Anim = useRef(new Animated.Value(0)).current;
  const note3Anim = useRef(new Animated.Value(0)).current;

  const startPulse = useCallback(() => {
    pulseLoop.current = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
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
          Animated.timing(anim, {
            toValue: 1,
            duration: 900,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      );
    makeNote(note1Anim, 0).start();
    makeNote(note2Anim, 300).start();
    makeNote(note3Anim, 600).start();
  }, [note1Anim, note2Anim, note3Anim]);

  const stopNotes = useCallback(() => {
    note1Anim.stopAnimation(() => note1Anim.setValue(0));
    note2Anim.stopAnimation(() => note2Anim.setValue(0));
    note3Anim.stopAnimation(() => note3Anim.setValue(0));
  }, [note1Anim, note2Anim, note3Anim]);

  // ── load / unload ──────────────────────────────────────────────────────────

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    }).catch(() => {});

    return () => {
      soundRef.current?.unloadAsync().catch(() => {});
    };
  }, []);

  // Unload old sound when URL changes
  useEffect(() => {
    setIsLoaded(false);
    setIsPlaying(false);
    setPositionMs(0);
    setDurationMs(0);
    setError(null);
    stopPulse();
    stopNotes();
    soundRef.current?.unloadAsync().catch(() => {});
    soundRef.current = null;
  }, [audioUrl, stopPulse, stopNotes]);

  const loadSound = useCallback(async () => {
    if (isLoaded || isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: false },
        (status: AVPlaybackStatus) => {
          if (!status.isLoaded) return;
          setPositionMs(status.positionMillis);
          setDurationMs(status.durationMillis ?? 0);
          setIsPlaying(status.isPlaying);
          if (status.didJustFinish) {
            setIsPlaying(false);
            setPositionMs(0);
          }
        },
      );
      soundRef.current = sound;
      setIsLoaded(true);
    } catch {
      setError('Could not load audio. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  }, [audioUrl, isLoaded, isLoading]);

  // ── playback controls ──────────────────────────────────────────────────────

  const handlePlayPause = useCallback(async () => {
    if (!isLoaded) {
      await loadSound();
      // After loading, start playback
      if (soundRef.current) {
        await soundRef.current.playAsync();
      }
      return;
    }
    const sound = soundRef.current;
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
      stopPulse();
      stopNotes();
    } else {
      await sound.playAsync();
      startPulse();
      startNotes();
    }
  }, [isLoaded, isPlaying, loadSound, startPulse, startNotes, stopPulse, stopNotes]);

  useEffect(() => {
    if (isPlaying) {
      startPulse();
      startNotes();
    } else {
      stopPulse();
      stopNotes();
    }
  }, [isPlaying, startPulse, startNotes, stopPulse, stopNotes]);

  // ── seek bar ───────────────────────────────────────────────────────────────

  const trackWidth = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        setIsSeeking(true);
        const pct = Math.max(0, Math.min(1, evt.nativeEvent.locationX / (trackWidth.current || 1)));
        setSeekPercent(pct);
      },
      onPanResponderMove: (evt) => {
        const pct = Math.max(0, Math.min(1, evt.nativeEvent.locationX / (trackWidth.current || 1)));
        setSeekPercent(pct);
      },
      onPanResponderRelease: async (evt) => {
        const pct = Math.max(0, Math.min(1, evt.nativeEvent.locationX / (trackWidth.current || 1)));
        setSeekPercent(pct);
        setIsSeeking(false);
        if (soundRef.current && durationMs > 0) {
          await soundRef.current.setPositionAsync(Math.floor(pct * durationMs));
        }
      },
    }),
  ).current;

  const displayPercent = isSeeking
    ? seekPercent
    : durationMs > 0
      ? positionMs / durationMs
      : 0;

  const displayPosition = isSeeking ? seekPercent * durationMs : positionMs;

  // ── note animation helpers ─────────────────────────────────────────────────

  const noteStyle = (anim: Animated.Value, offsetX: number) => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -22],
        }),
      },
      {
        translateX: offsetX,
      },
      {
        scale: anim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.6, 1.1, 0.8],
        }),
      },
    ],
  });

  // ── render ─────────────────────────────────────────────────────────────────

  return (
    <LinearGradient
      colors={['#FFF3E0', '#FFF8F0', '#E3F2FD']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>

      {/* Floating musical notes */}
      <View style={styles.notesContainer} pointerEvents="none">
        <Animated.Text style={[styles.noteEmoji, noteStyle(note1Anim, -8)]}>🎵</Animated.Text>
        <Animated.Text style={[styles.noteEmoji, noteStyle(note2Anim, 4)]}>🎶</Animated.Text>
        <Animated.Text style={[styles.noteEmoji, noteStyle(note3Anim, -2)]}>🎵</Animated.Text>
      </View>

      {/* Header row */}
      <View style={styles.headerRow}>
        <Text style={styles.listenLabel}>🎧 Listen to the story</Text>
      </View>

      {narrator || title ? (
        <Text style={styles.narratorText} numberOfLines={1}>
          {narrator ? `Narrated by ${narrator}` : title}
        </Text>
      ) : null}

      {/* Error */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Controls row */}
      <View style={styles.controlsRow}>
        {/* Time: current */}
        <Text style={styles.timeText}>{formatTime(displayPosition)}</Text>

        {/* Play / Pause button */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity
            style={styles.playBtn}
            onPress={handlePlayPause}
            activeOpacity={0.8}
            disabled={isLoading}>
            <LinearGradient
              colors={isPlaying ? ['#FF8A65', '#FF6B6B'] : ['#F9A825', '#F57F17']}
              style={styles.playBtnGradient}>
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <FontAwesome
                  name={isPlaying ? 'pause' : 'play'}
                  size={22}
                  color="#fff"
                  style={isPlaying ? undefined : styles.playIcon}
                />
              )}
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Time: total */}
        <Text style={styles.timeText}>{formatTime(durationMs)}</Text>
      </View>

      {/* Seek / progress bar */}
      <View
        style={styles.trackContainer}
        {...panResponder.panHandlers}
        onLayout={(e) => {
          trackWidth.current = e.nativeEvent.layout.width;
        }}>
        {/* Track background */}
        <View style={styles.track}>
          {/* Filled portion */}
          <View style={[styles.trackFill, { flex: displayPercent }]} />
          {/* Remaining portion */}
          <View style={[styles.trackRemaining, { flex: 1 - displayPercent }]} />
        </View>
        {/* Thumb */}
        <View
          style={[
            styles.thumb,
            {
              left: `${(displayPercent * 100).toFixed(1)}%` as unknown as number,
            },
          ]}
        />
      </View>

      {/* Hint text */}
      {!isLoaded && !isLoading && !error && (
        <Text style={styles.hintText}>Tap ▶ to start listening</Text>
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
  noteEmoji: {
    fontSize: 18,
  },
  headerRow: {
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
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
  playIcon: {
    marginLeft: 4, // optical centering for play triangle
  },
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
  trackFill: {
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  trackRemaining: {
    backgroundColor: colors.border,
    borderRadius: 3,
  },
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

