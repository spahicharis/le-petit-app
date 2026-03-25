/**
 * Global audio store for LePetit.app
 *
 * The expo-av Sound instance lives as a module-level singleton so it is never
 * serialised into Zustand state (which would cause issues) and is not tied to
 * any component's lifecycle.  Zustand holds only the reactive/UI state.
 */
import { Audio, AVPlaybackStatus, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import { create } from 'zustand';
import i18n from '@/constants/i18n';
import type { Story } from '@/constants/data';

// ─── singleton ────────────────────────────────────────────────────────────────

/** The one and only Sound instance.  Null when nothing is loaded. */
let _sound: Audio.Sound | null = null;

// ─── types ────────────────────────────────────────────────────────────────────

export interface AudioStoreState {
  currentStory: Story | null;
  isLoaded: boolean;
  isLoading: boolean;
  isPlaying: boolean;
  positionMs: number;
  durationMs: number;
  error: string | null;
}

export interface AudioStoreActions {
  /**
   * Load a story and immediately start playback.
   * If the same story is already loaded just resume / restart from current pos.
   */
  play: (story: Story) => Promise<void>;
  /** Toggle play / pause for the currently loaded story. */
  togglePlayPause: () => Promise<void>;
  /** Seek to an absolute millisecond position. */
  seek: (ms: number) => Promise<void>;
  /** Stop playback, unload audio, and reset all state. */
  stop: () => Promise<void>;
}

export type AudioStore = AudioStoreState & AudioStoreActions;

// ─── initial state ────────────────────────────────────────────────────────────

const RESET: AudioStoreState = {
  currentStory: null,
  isLoaded: false,
  isLoading: false,
  isPlaying: false,
  positionMs: 0,
  durationMs: 0,
  error: null,
};

// ─── store ────────────────────────────────────────────────────────────────────

export const useAudioStore = create<AudioStore>((set, get) => {
  /** Stable callback reference – passed directly to expo-av. */
  const onStatus = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;
    set({
      positionMs: status.positionMillis,
      durationMs: status.durationMillis ?? get().durationMs,
      isPlaying: status.isPlaying,
    });
    if (status.didJustFinish) {
      set({ isPlaying: false, positionMs: 0 });
    }
  };

  return {
    ...RESET,

    play: async (story: Story) => {
      const { currentStory } = get();

      // ── same story already loaded → just resume ──
      if (currentStory?.id === story.id && _sound) {
        await _sound.playAsync().catch(() => {});
        return;
      }

      // ── unload the previous track ──
      if (_sound) {
        await _sound.unloadAsync().catch(() => {});
        _sound = null;
      }

      if (!story.audioUrl) {
        set({ ...RESET, currentStory: story, error: i18n.t('audio.noAudio') });
        return;
      }

      set({ ...RESET, currentStory: story, isLoading: true });

      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          interruptionModeIOS: InterruptionModeIOS.DuckOthers,
          interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });

        const { sound } = await Audio.Sound.createAsync(
          { uri: story.audioUrl },
          { shouldPlay: true },
          onStatus,
        );

        // Guard: stop() may have been called while createAsync was in flight.
        if (!get().currentStory) {
          await sound.unloadAsync().catch(() => {});
          return;
        }

        _sound = sound;
        set({ isLoaded: true, isLoading: false });
      } catch {
        set({ isLoading: false, error: i18n.t('audio.audioError') });
      }
    },

    togglePlayPause: async () => {
      if (!_sound) return;
      if (get().isPlaying) {
        await _sound.pauseAsync().catch(() => {});
      } else {
        await _sound.playAsync().catch(() => {});
      }
    },

    seek: async (ms: number) => {
      if (!_sound) return;
      await _sound.setPositionAsync(Math.floor(ms)).catch(() => {});
    },

    stop: async () => {
      if (_sound) {
        await _sound.unloadAsync().catch(() => {});
        _sound = null;
      }
      set(RESET);
    },
  };
});

