import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Share,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStoryById } from '@/constants/data';
import { colors, spacing, fontSize, fontWeight, radius } from '@/constants/theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AudioPlayer } from '@/components/ui/AudioPlayer';

export default function StoryDetailScreen() {
  const navigation = useNavigation();
  const { storyId } = useLocalSearchParams<{ storyId: string }>();
  const story = getStoryById(storyId ?? '');

  const [isFav, setIsFav] = useState(story?.isFavorite ?? false);

  useEffect(() => {
    if (story?.title) {
      navigation.setOptions({ title: story.title });
    }
  }, [story, navigation]);

  const handleShare = async () => {
    if (!story) return;
    try {
      await Share.share({ message: `Check out "${story.title}" on LePetit.app!` });
    } catch {
      // share cancelled
    }
  };

  const handleDownload = () => {
    Alert.alert('Download', 'Offline downloads will be available in a future update.');
  };

  if (!story) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundEmoji}>📭</Text>
          <Text style={styles.notFoundText}>Story not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover image */}
        {story.image ? (
          <Image source={{ uri: story.image }} style={styles.coverImage} />
        ) : (
          <View style={styles.coverPlaceholder}>
            <Text style={styles.coverEmoji}>📖</Text>
          </View>
        )}

        <View style={styles.body}>
          {/* Title & meta */}
          <Text style={styles.title}>{story.title}</Text>
          <View style={styles.metaRow}>
            {story.originalAuthor && (
              <Text style={styles.metaChip}>✍️ {story.originalAuthor}</Text>
            )}
            {story.narrator && (
              <Text style={styles.metaChip}>🎙 {story.narrator}</Text>
            )}
          </View>

          {/* Actions row */}
          <View style={styles.actionsRow}>
            <ActionButton
              icon={isFav ? 'heart' : 'heart-o'}
              label="Favourite"
              color={isFav ? colors.secondary : colors.textMuted}
              onPress={() => setIsFav((v) => !v)}
            />
            <ActionButton
              icon="share-alt"
              label="Share"
              color={colors.textMuted}
              onPress={handleShare}
            />
            <ActionButton
              icon="download"
              label="Download"
              color={colors.textMuted}
              onPress={handleDownload}
            />
          </View>

          {/* Author & Narrator row */}
          {(story.originalAuthor || story.narrator) && (
            <View style={styles.creatorsRow}>
              {story.originalAuthor && (
                <CreatorChip
                  name={story.originalAuthor}
                  role="Author"
                  color={colors.primary}
                />
              )}
              {story.originalAuthor && story.narrator && (
                <View style={styles.creatorDivider} />
              )}
              {story.narrator && (
                <CreatorChip
                  name={story.narrator}
                  role="Narrator"
                  color={colors.accent}
                />
              )}
            </View>
          )}

          {/* Short description */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>About this story</Text>
            <Text style={styles.shortDesc}>{story.shortDescription}</Text>
          </View>

          {/* Story */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>The Story</Text>
            <Text style={styles.bodyText}>{story.storyDescription}</Text>
          </View>

          {/* Conclusion */}
          {story.conclusion.length > 0 && (
            <View style={[styles.section, styles.conclusionBox]}>
              <Text style={styles.conclusionLabel}>✨ Moral of the story</Text>
              <Text style={styles.conclusionText}>{story.conclusion}</Text>
            </View>
          )}

          {/* Questions */}
          {story.questions.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Questions for kids 💬</Text>
              {story.questions.map((q, i) => (
                <View key={i} style={styles.questionRow}>
                  <Text style={styles.questionNum}>{i + 1}.</Text>
                  <Text style={styles.questionText}>{q}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Audio player */}
          {story.audioUrl && (
            <View style={styles.section}>
              <AudioPlayer story={story} />
            </View>
          )}

          {/* Video placeholder */}
          {story.videoUrl && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Media</Text>
              <View style={styles.mediaChip}>
                <FontAwesome name="play-circle" size={18} color={colors.secondary} />
                <Text style={styles.mediaText}>Video available</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ActionButton({
  icon,
  label,
  color,
  onPress,
}: {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  label: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.actionBtn} onPress={onPress} activeOpacity={0.75}>
      <FontAwesome name={icon} size={22} color={color} />
      <Text style={[styles.actionLabel, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

/** Extracts up to two initials from a name string. */
function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

function CreatorChip({ name, role, color }: { name: string; role: string; color: string }) {
  return (
    <View style={styles.creatorChip}>
      {/* Avatar circle */}
      <View style={[styles.avatar, { backgroundColor: color + '22', borderColor: color + '55' }]}>
        <Text style={[styles.avatarInitials, { color }]}>{initials(name)}</Text>
      </View>
      {/* Text */}
      <View style={styles.creatorInfo}>
        <Text style={styles.creatorRole}>{role}</Text>
        <Text style={styles.creatorName} numberOfLines={1}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  notFoundEmoji: { fontSize: 48 },
  notFoundText: { fontSize: fontSize.lg, color: colors.textMuted },
  coverImage: { width: '100%', height: 240 },
  coverPlaceholder: {
    width: '100%',
    height: 240,
    backgroundColor: colors.primary + '33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverEmoji: { fontSize: 80 },
  body: { padding: spacing.lg },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.extrabold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  metaChip: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    backgroundColor: colors.border,
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  actionBtn: { alignItems: 'center', gap: spacing.xs },
  actionLabel: { fontSize: fontSize.xs, fontWeight: fontWeight.semibold },
  // ── creators ──
  creatorsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },
  creatorChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  creatorDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  creatorInfo: {
    flex: 1,
    gap: 1,
  },
  creatorRole: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    fontWeight: fontWeight.semibold,
  },
  creatorName: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  section: { marginBottom: spacing.xl },
  sectionLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  shortDesc: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
    color: colors.text,
    lineHeight: 26,
    fontStyle: 'italic',
  },
  bodyText: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 26,
  },
  conclusionBox: {
    backgroundColor: colors.primary + '22',
    borderRadius: radius.md,
    padding: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  conclusionLabel: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  conclusionText: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 24,
  },
  questionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  questionNum: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    minWidth: 20,
  },
  questionText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 22,
  },
  mediaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  mediaText: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: fontWeight.medium,
  },
});

