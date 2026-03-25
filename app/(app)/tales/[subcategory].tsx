import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { getSubcategory, getStoriesBySubcategory } from '@/constants/data';
import { colors, spacing, fontSize, fontWeight, radius } from '@/constants/theme';
import type { Story } from '@/constants/data';

export default function SubcategoryScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { subcategory } = useLocalSearchParams<{ subcategory: string }>();
  const { t } = useTranslation();

  const sub = getSubcategory(subcategory ?? '');
  const storyList = getStoriesBySubcategory(subcategory ?? '');

  useEffect(() => {
    if (sub?.title) {
      navigation.setOptions({ title: sub.title });
    }
  }, [sub, navigation]);

  const renderItem = ({ item }: { item: Story }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/(app)/story/${item.id}`)}
      activeOpacity={0.85}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.thumb} />
      ) : (
        <View style={styles.thumbPlaceholder}>
          <Text style={styles.thumbEmoji}>📖</Text>
        </View>
      )}
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDesc} numberOfLines={2}>{item.shortDescription}</Text>
        {item.narrator && (
          <Text style={styles.cardMeta}>🎙 {item.narrator}</Text>
        )}
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={storyList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          sub ? (
            <View style={styles.listHeader}>
              {sub.image && (
                <Image source={{ uri: sub.image }} style={styles.heroBanner} />
              )}
              <Text style={styles.headerTitle}>{sub.title}</Text>
              <Text style={styles.headerSub}>{sub.description}</Text>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <Text style={styles.empty}>{t('tales.noStories')}</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.lg },
  listHeader: { marginBottom: spacing.lg },
  heroBanner: {
    width: '100%',
    height: 160,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
  },
  headerTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.extrabold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  headerSub: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    lineHeight: 22,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  thumb: { width: 88, height: 88 },
  thumbPlaceholder: {
    width: 88,
    height: 88,
    backgroundColor: colors.primary + '33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbEmoji: { fontSize: 32 },
  cardBody: { flex: 1, padding: spacing.md, gap: spacing.xs },
  cardTitle: { fontSize: fontSize.md, fontWeight: fontWeight.bold, color: colors.text },
  cardDesc: { fontSize: fontSize.sm, color: colors.textMuted, lineHeight: 18 },
  cardMeta: { fontSize: fontSize.xs, color: colors.textMuted },
  arrow: { fontSize: 24, color: colors.primary, paddingRight: spacing.md },
  empty: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: fontSize.md,
    marginTop: spacing.xl,
  },
});

