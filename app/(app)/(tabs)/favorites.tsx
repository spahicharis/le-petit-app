import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { stories } from '@/constants/data';
import { colors, spacing, fontSize, fontWeight, radius } from '@/constants/theme';
import type { Story } from '@/constants/data';

export default function FavouritesTab() {
  const router = useRouter();
  const { t } = useTranslation();
  const favourites = stories.filter((s) => s.isFavorite);

  const renderItem = ({ item }: { item: Story }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/(app)/story/${item.id}`)}
      activeOpacity={0.8}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.thumb} />
      ) : (
        <View style={styles.thumbPlaceholder}>
          <Text style={styles.thumbEmoji}>📖</Text>
        </View>
      )}
      <View style={styles.body}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDesc} numberOfLines={2}>{item.shortDescription}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>

      {favourites.length === 0 ? (
        <View style={styles.emptyArea}>
          <Text style={styles.emptyEmoji}>🤍</Text>
          <Text style={styles.emptyText}>{t('favourites.empty')}</Text>
          <Text style={styles.emptyHint}>{t('favourites.hint')}</Text>
        </View>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
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
  },
  emptyArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  emptyEmoji: { fontSize: 56 },
  emptyText: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  emptyHint: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  list: { padding: spacing.lg, gap: spacing.sm },
  card: {
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
  body: { flex: 1, padding: spacing.sm, justifyContent: 'center', gap: spacing.xs },
  cardTitle: { fontSize: fontSize.md, fontWeight: fontWeight.bold, color: colors.text },
  cardDesc: { fontSize: fontSize.sm, color: colors.textMuted, lineHeight: 18 },
});

