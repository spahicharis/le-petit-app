import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { storySubcategories } from '@/constants/data';
import { colors, spacing, fontSize, fontWeight, radius } from '@/constants/theme';
import type { StorySubcategory } from '@/constants/data';

export default function TalesLandingScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const renderItem = ({ item }: { item: StorySubcategory }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/(app)/tales/${item.id}`)}
      activeOpacity={0.85}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.cardImage} />
      ) : (
        <View style={styles.cardImagePlaceholder} />
      )}
      <View style={styles.cardOverlay}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDesc}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={storySubcategories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderTitle}>{t('tales.chooseCategory')}</Text>
            <Text style={styles.listHeaderSub}>{t('tales.startReading')}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.lg, gap: spacing.md },
  listHeader: { marginBottom: spacing.lg },
  listHeaderTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.extrabold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  listHeaderSub: {
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  card: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    height: 160,
    marginBottom: spacing.md,
    backgroundColor: colors.primary + '44',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cardImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary + '44',
  },
  cardOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.38)',
    padding: spacing.lg,
    justifyContent: 'flex-end',
  },
  cardTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.extrabold,
    color: '#fff',
    marginBottom: spacing.xs,
  },
  cardDesc: {
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 18,
  },
});

