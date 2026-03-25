const en = {
  // ── tabs ──────────────────────────────────────────────────────────────────
  tabs: {
    home: 'Home',
    notifications: 'Notifications',
    search: 'Search',
    favourites: 'Favourites',
  },

  // ── welcome ───────────────────────────────────────────────────────────────
  welcome: {
    tagline: 'Magical stories for\nlittle dreamers ✨',
    feature1: 'Hundreds of classic tales',
    feature2: 'Soothing bedtime stories',
    feature3: 'Audio narration available',
    continueWithoutLogin: 'Continue without login',
    signIn: 'Sign In',
    signInHint: 'Sign in to save favourites and access the full library.',
  },

  // ── login ─────────────────────────────────────────────────────────────────
  login: {
    title: 'Sign In',
    subtitle: 'Save your favourites and unlock the full story library.',
    withApple: 'Continue with Apple',
    withGoogle: 'Continue with Google',
    comingSoon: 'coming soon',
    placeholder:
      'Real authentication will be available in a future update. For now, sign-in flows are placeholders.',
    back: '← Back',
  },

  // ── home ──────────────────────────────────────────────────────────────────
  home: {
    greeting: 'Hello, {{name}}! 👋',
    guestGreeting: 'Welcome! 👋',
    explore: 'Explore',
    signOut: 'Sign out',
    talesTitle: 'Tales',
    talesDesc: 'Explore our library of classic stories and animal adventures.',
    parentsTitle: 'For Parents',
    parentsDesc: 'Answers to common questions about the app and its content.',
    logopedTitle: 'My Logoped',
    logopedDesc: 'Personalised speech and language exercises — coming soon.',
  },

  // ── tales ─────────────────────────────────────────────────────────────────
  tales: {
    chooseCategory: 'Choose a category',
    startReading: 'Pick a story collection below and start reading!',
    noStories: 'No stories found in this category.',
  },

  // ── story detail ──────────────────────────────────────────────────────────
  story: {
    aboutThisStory: 'About this story',
    theStory: 'The Story',
    moral: '✨ Moral of the story',
    questionsForKids: 'Questions for kids 💬',
    author: 'Author',
    narrator: 'Narrator',
    favourite: 'Favourite',
    share: 'Share',
    download: 'Download',
    notFound: 'Story not found.',
    videoAvailable: 'Video available',
    downloadSoon: 'Offline downloads will be available in a future update.',
    shareMessage: 'Check out "{{title}}" on LePetit.app!',
  },

  // ── audio player ──────────────────────────────────────────────────────────
  audio: {
    listenToStory: '🎧 Listen to the story',
    narratedBy: 'Narrated by {{name}}',
    tapToListen: 'Tap ▶ to start listening',
    noAudio: 'No audio available for this story.',
    audioError: 'Could not load audio. Please check your connection.',
    tapToOpen: 'Tap to open',
  },

  // ── notifications ─────────────────────────────────────────────────────────
  notifications: {
    title: 'Notifications',
    empty: '🔔 No notifications yet.',
    hint: 'We will notify you when new stories are added or when your favourites are updated.',
  },

  // ── search ────────────────────────────────────────────────────────────────
  search: {
    title: 'Search',
    inputPlaceholder: 'Search stories…',
    prompt: 'Type a story title or keyword to search.',
    noResults: 'No stories found for "{{query}}".',
  },

  // ── favourites ────────────────────────────────────────────────────────────
  favourites: {
    title: 'Favourites',
    empty: 'No favourites yet.',
    hint: 'Tap the heart icon on any story to save it here.',
  },

  // ── parents / faq ─────────────────────────────────────────────────────────
  parents: {
    subtitle: 'Answers to common questions about LePetit.app and how it works.',
    faq: [
      {
        id: 'faq-1',
        question: 'What is LePetit.app?',
        answer:
          'LePetit.app is a storytelling app designed for children. It features classic tales, bedtime stories, and educational content in a safe, ad-free environment.',
      },
      {
        id: 'faq-2',
        question: 'What age group is the app designed for?',
        answer:
          'Our stories are crafted for children between 2 and 10 years old. Younger children enjoy the read-aloud feature, while older readers can explore stories independently.',
      },
      {
        id: 'faq-3',
        question: 'Are the stories suitable for bedtime?',
        answer:
          'Yes! Our Good Night Tales category is curated with calming, soothing stories that help children wind down and prepare for sleep.',
      },
      {
        id: 'faq-4',
        question: 'Can my child use the app without me?',
        answer:
          'Absolutely. The app is designed to be easy for children to navigate on their own. All content is age-appropriate and the interface is simple and intuitive.',
      },
      {
        id: 'faq-5',
        question: 'Is a subscription required?',
        answer:
          'You can browse and read a selection of free stories without logging in. A subscription unlocks the full library, audio narration, and premium features.',
      },
      {
        id: 'faq-6',
        question: 'How do I cancel my subscription?',
        answer:
          'You can manage or cancel your subscription at any time through your App Store or Google Play account settings.',
      },
    ],
  },

  // ── my logoped ────────────────────────────────────────────────────────────
  myLogoped: {
    title: 'My Logoped',
    comingSoon: 'Coming soon',
    body: 'Personalised speech and language exercises, progress tracking, and guidance from speech therapists will be available in a future update.',
  },
} as const;

export default en;

/**
 * Recursively replace every leaf string-literal type with `string`.
 * This lets other locales satisfy the type without needing to match
 * the exact English string values.
 */
type DeepString<T> =
  T extends string
    ? string
    : T extends readonly (infer U)[]
      ? DeepString<U>[]
      : { [K in keyof T]: DeepString<T[K]> };

export type Translation = DeepString<typeof en>;

