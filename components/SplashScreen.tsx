import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions } from 'react-native';
import { colors, fontSize, fontWeight, spacing } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

// Floating emoji decorations scattered around the screen
const FLOATERS = [
  { id: 0, x: 0.06, y: 0.10, size: 26, emoji: '⭐' },
  { id: 1, x: 0.80, y: 0.08, size: 22, emoji: '🌟' },
  { id: 2, x: 0.88, y: 0.32, size: 17, emoji: '✨' },
  { id: 3, x: 0.04, y: 0.48, size: 20, emoji: '⭐' },
  { id: 4, x: 0.86, y: 0.60, size: 24, emoji: '🌟' },
  { id: 5, x: 0.10, y: 0.76, size: 17, emoji: '✨' },
  { id: 6, x: 0.75, y: 0.82, size: 22, emoji: '⭐' },
  { id: 7, x: 0.44, y: 0.04, size: 15, emoji: '✨' },
  { id: 8, x: 0.52, y: 0.91, size: 19, emoji: '🌟' },
  { id: 9, x: 0.28, y: 0.93, size: 14, emoji: '✨' },
  { id: 10, x: 0.64, y: 0.05, size: 18, emoji: '⭐' },
];

interface Props {
  onFinish: () => void;
}

export function AppSplashScreen({ onFinish }: Props) {
  // --- Animation values ---
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const glowScale = useRef(new Animated.Value(0)).current;
  const bookScale = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(24)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;

  const floaterAnims = useRef(
    FLOATERS.map(() => ({
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0),
      translateY: new Animated.Value(0),
    }))
  ).current;

  const dotScales = useRef([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
  ]).current;

  useEffect(() => {
    // ── Entrance ──────────────────────────────────────────────────────────────

    // Stars pop in, staggered
    const starEntrances = FLOATERS.map((_, i) =>
      Animated.sequence([
        Animated.delay(i * 55),
        Animated.parallel([
          Animated.spring(floaterAnims[i].scale, {
            toValue: 1,
            tension: 140,
            friction: 7,
            useNativeDriver: true,
          }),
          Animated.timing(floaterAnims[i].opacity, {
            toValue: 0.9,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    // Glow circle expands
    const glowIn = Animated.spring(glowScale, {
      toValue: 1,
      tension: 50,
      friction: 6,
      useNativeDriver: true,
    });

    // Book bounces in with overshoot
    const bookIn = Animated.sequence([
      Animated.delay(80),
      Animated.spring(bookScale, {
        toValue: 1,
        tension: 55,
        friction: 4,
        useNativeDriver: true,
      }),
    ]);

    // Title slides up + fades in
    const titleIn = Animated.sequence([
      Animated.delay(340),
      Animated.parallel([
        Animated.spring(titleY, {
          toValue: 0,
          tension: 65,
          friction: 9,
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 380,
          useNativeDriver: true,
        }),
      ]),
    ]);

    // Tagline fades in
    const taglineIn = Animated.sequence([
      Animated.delay(580),
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 380,
        useNativeDriver: true,
      }),
    ]);

    // Run all entrance animations in parallel
    Animated.parallel([
      ...starEntrances,
      glowIn,
      bookIn,
      titleIn,
      taglineIn,
    ]).start(() => {
      // ── Loops ──────────────────────────────────────────────────────────────

      // Stars float up and down forever
      FLOATERS.forEach((_, i) => {
        const dist = 9 + (i % 4) * 3;
        Animated.loop(
          Animated.sequence([
            Animated.timing(floaterAnims[i].translateY, {
              toValue: -dist,
              duration: 1400 + i * 120,
              useNativeDriver: true,
            }),
            Animated.timing(floaterAnims[i].translateY, {
              toValue: dist * 0.6,
              duration: 1400 + i * 120,
              useNativeDriver: true,
            }),
          ])
        ).start();
      });

      // Loading dots bounce in sequence
      const dotBounce = (val: Animated.Value, delay: number) =>
        Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.spring(val, {
              toValue: 1.7,
              tension: 130,
              friction: 5,
              useNativeDriver: true,
            }),
            Animated.spring(val, {
              toValue: 1,
              tension: 130,
              friction: 8,
              useNativeDriver: true,
            }),
            Animated.delay(360),
          ])
        );

      dotBounce(dotScales[0], 0).start();
      dotBounce(dotScales[1], 180).start();
      dotBounce(dotScales[2], 360).start();

      // ── Exit ───────────────────────────────────────────────────────────────
      Animated.sequence([
        Animated.delay(1900),
        Animated.timing(containerOpacity, {
          toValue: 0,
          duration: 480,
          useNativeDriver: true,
        }),
      ]).start(() => onFinish());
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Animated.View style={[styles.container, { opacity: containerOpacity }]}>

      {/* Floating stars */}
      {FLOATERS.map((f, i) => (
        <Animated.Text
          key={f.id}
          style={[
            styles.floater,
            {
              left: f.x * width - f.size / 2,
              top: f.y * height - f.size / 2,
              fontSize: f.size,
              opacity: floaterAnims[i].opacity,
              transform: [
                { scale: floaterAnims[i].scale },
                { translateY: floaterAnims[i].translateY },
              ],
            },
          ]}>
          {f.emoji}
        </Animated.Text>
      ))}

      {/* Glow circle + book */}
      <Animated.View
        style={[styles.glowCircle, { transform: [{ scale: glowScale }] }]}>
        <Animated.Text
          style={[styles.bookEmoji, { transform: [{ scale: bookScale }] }]}>
          📖
        </Animated.Text>
      </Animated.View>

      {/* App name */}
      <Animated.View
        style={[
          styles.titleRow,
          { opacity: titleOpacity, transform: [{ translateY: titleY }] },
        ]}>
        <Text style={styles.appTitle}>LePetit</Text>
        <Text style={styles.appDomain}>.app</Text>
      </Animated.View>

      {/* Tagline */}
      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        ✨ Magical stories for little dreamers ✨
      </Animated.Text>

      {/* Bouncing loading dots */}
      <View style={styles.dotsRow}>
        {dotScales.map((scale, i) => (
          <Animated.View
            key={i}
            style={[styles.dot, { transform: [{ scale }] }]}
          />
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floater: {
    position: 'absolute',
  },
  glowCircle: {
    width: 164,
    height: 164,
    borderRadius: 82,
    backgroundColor: colors.primary + '38',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 28,
    elevation: 10,
  },
  bookEmoji: {
    fontSize: 74,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.sm,
  },
  appTitle: {
    fontSize: 44,
    fontWeight: fontWeight.extrabold,
    color: colors.text,
    letterSpacing: -1,
  },
  appDomain: {
    fontSize: 28,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
    letterSpacing: -0.3,
  },
  tagline: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    textAlign: 'center',
    letterSpacing: 0.2,
    marginBottom: spacing.xxl,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    position: 'absolute',
    bottom: 72,
    alignItems: 'flex-end',
  },
  dot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
});

