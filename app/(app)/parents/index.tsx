import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { faqItems } from '@/constants/data';
import { colors, spacing, fontSize, fontWeight, radius } from '@/constants/theme';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((v) => !v);
  };

  return (
    <TouchableOpacity style={styles.faqCard} onPress={toggle} activeOpacity={0.8}>
      <View style={styles.faqHeader}>
        <Text style={styles.faqQuestion}>{question}</Text>
        <Text style={styles.faqChevron}>{open ? '▲' : '▼'}</Text>
      </View>
      {open && <Text style={styles.faqAnswer}>{answer}</Text>}
    </TouchableOpacity>
  );
}

export default function ParentsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.intro}>
          <Text style={styles.introEmoji}>👨‍👩‍👧</Text>
          <Text style={styles.introTitle}>For Parents</Text>
          <Text style={styles.introSub}>
            Answers to common questions about LePetit.app and how it works.
          </Text>
        </View>
        {faqItems.map((item) => (
          <FaqItem key={item.id} question={item.question} answer={item.answer} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.sm },
  intro: { alignItems: 'center', marginBottom: spacing.lg },
  introEmoji: { fontSize: 48, marginBottom: spacing.sm },
  introTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.extrabold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  introSub: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  faqCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  faqQuestion: {
    flex: 1,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    lineHeight: 22,
  },
  faqChevron: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  faqAnswer: {
    marginTop: spacing.md,
    fontSize: fontSize.md,
    color: colors.textMuted,
    lineHeight: 22,
  },
});

