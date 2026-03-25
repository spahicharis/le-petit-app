import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { stories } from '@/constants/data';
import { colors, spacing, fontSize, fontWeight, radius } from '@/constants/theme';
import type { Story } from '@/constants/data';

export default function SearchTab() {
  const router = useRouter();
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  const filtered = query.trim().length > 1
    ? stories.filter(
        (s) =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          s.shortDescription.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  const renderItem = ({ item }: { item: Story }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => router.push(`/(app)/story/${item.id}`)}
      activeOpacity={0.8}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.thumb} />
      ) : (
        <View style={styles.thumbPlaceholder}>
          <Text style={styles.thumbEmoji}>📖</Text>
        </View>
      )}
      <View style={styles.resultBody}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <Text style={styles.resultDesc} numberOfLines={2}>{item.shortDescription}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('search.title')}</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.input}
            placeholder={t('search.inputPlaceholder')}
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {query.trim().length > 1 ? (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.empty}>{t('search.noResults', { query })}</Text>
          }
        />
      ) : (
        <View style={styles.promptArea}>
          <Text style={styles.promptEmoji}>📚</Text>
          <Text style={styles.prompt}>{t('search.prompt')}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.lg },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.extrabold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  searchIcon: { fontSize: 16 },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
  },
  clearIcon: { fontSize: 14, color: colors.textMuted, padding: spacing.xs },
  list: { padding: spacing.lg, gap: spacing.sm },
  resultItem: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  thumb: { width: 72, height: 72 },
  thumbPlaceholder: {
    width: 72,
    height: 72,
    backgroundColor: colors.primary + '33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbEmoji: { fontSize: 28 },
  resultBody: { flex: 1, padding: spacing.sm, justifyContent: 'center', gap: spacing.xs },
  resultTitle: { fontSize: fontSize.md, fontWeight: fontWeight.bold, color: colors.text },
  resultDesc: { fontSize: fontSize.sm, color: colors.textMuted, lineHeight: 18 },
  promptArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  promptEmoji: { fontSize: 48 },
  prompt: { fontSize: fontSize.md, color: colors.textMuted },
  empty: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: fontSize.md,
    marginTop: spacing.xl,
  },
});

