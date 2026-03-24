/** Shared data types and mock content for LePetit.app */

export interface StoryCategory {
  id: string;
  title: string;
  description: string;
  image: string | null;
}

export interface StorySubcategory {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  image: string | null;
}

export interface Story {
  id: string;
  subcategoryId: string;
  title: string;
  shortDescription: string;
  storyDescription: string;
  conclusion: string;
  questions: string[];
  narrator: string | null;
  originalAuthor: string | null;
  image: string | null;
  audioUrl: string | null;
  videoUrl: string | null;
  isFavorite: boolean;
}

export const storyCategories: StoryCategory[] = [
  {
    id: 'cat-1',
    title: 'Tales',
    description: 'Classic and original stories for every little reader.',
    image: 'https://picsum.photos/seed/tales-category/800/400',
  },
];

export const storySubcategories: StorySubcategory[] = [
  {
    id: 'animals',
    categoryId: 'cat-1',
    title: 'Tales about Animals',
    description: 'Discover the wonderful world of animal adventures.',
    image: 'https://picsum.photos/seed/animals-sub/600/400',
  },
  {
    id: 'goodnight',
    categoryId: 'cat-1',
    title: 'Good Night Tales',
    description: 'Sweet and soothing stories perfect for bedtime.',
    image: 'https://picsum.photos/seed/goodnight-sub/600/400',
  },
];

export const stories: Story[] = [
  {
    id: 'bambi',
    subcategoryId: 'animals',
    title: 'Bambi',
    shortDescription: 'A young deer discovers the wonders of the forest.',
    storyDescription:
      'Deep in the forest, a little fawn named Bambi was born. His mother showed him the meadows and the babbling brooks. Bambi made friends with a playful rabbit named Thumper and a shy skunk named Flower. Together they explored, played, and grew. When winter came, the forest was blanketed in snow, and Bambi learned that every season brings new beauty.',
    conclusion:
      'Bambi grew into a strong young deer, guided by love, friendship, and the lessons of the forest. He learned that courage means facing the unknown with an open heart.',
    questions: [
      "What was the name of Bambi's rabbit friend?",
      'What season did Bambi experience for the first time?',
      'What do you think the forest teaches us about nature?',
    ],
    narrator: 'Lena V.',
    originalAuthor: 'Felix Salten',
    image: 'https://picsum.photos/seed/bambi/600/400',
    audioUrl: null,
    videoUrl: null,
    isFavorite: false,
  },
  {
    id: 'tortoise-hare',
    subcategoryId: 'animals',
    title: 'The Tortoise and the Hare',
    shortDescription: 'A speedy hare and a slow tortoise race to the finish line.',
    storyDescription:
      'Once upon a time, a hare boasted to everyone in the forest about how fast he could run. A quiet tortoise challenged him to a race. The animals laughed, but the tortoise accepted with a calm smile. The hare sprinted ahead and lay down to nap, certain of victory. The tortoise plodded on, one slow step at a time, never stopping, never resting.',
    conclusion:
      'The tortoise crossed the finish line first! Slow and steady wins the race. Patience and persistence will always carry you further than pride alone.',
    questions: [
      'Why did the hare lose the race?',
      'What does slow and steady wins the race mean to you?',
      'Can you think of a time when being patient helped you?',
    ],
    narrator: 'Marco T.',
    originalAuthor: 'Aesop',
    image: 'https://picsum.photos/seed/tortoise-hare/600/400',
    audioUrl: null,
    videoUrl: null,
    isFavorite: false,
  },
  {
    id: 'lion-mouse',
    subcategoryId: 'animals',
    title: 'The Lion and the Mouse',
    shortDescription: 'Even the smallest friend can save the mightiest lion.',
    storyDescription:
      'A great lion slept in the sun when a tiny mouse scurried across his paw and woke him. The lion roared and caught the mouse. The mouse begged for mercy and promised to repay him someday. The lion laughed but let the mouse go. Days later, hunters trapped the lion in a net. The little mouse heard the roar and gnawed through the ropes to set the lion free.',
    conclusion:
      'The lion was free! No act of kindness is ever too small. Even the tiniest friend can make a big difference when it matters most.',
    questions: [
      'How did the mouse help the lion?',
      'Why is it important to be kind to everyone, no matter how small?',
      'Have you ever helped someone who was bigger or stronger than you?',
    ],
    narrator: 'Lena V.',
    originalAuthor: 'Aesop',
    image: 'https://picsum.photos/seed/lion-mouse/600/400',
    audioUrl: null,
    videoUrl: null,
    isFavorite: false,
  },
  {
    id: 'cinderella',
    subcategoryId: 'goodnight',
    title: 'Cinderella',
    shortDescription: 'A kind girl whose dream comes true with a little magic.',
    storyDescription:
      'Cinderella lived with her stepmother and two stepsisters who gave her all the hard work. Despite everything, she remained kind and gentle. One evening, a royal ball was announced. While her stepsisters went dressed in fine clothes, Cinderella stayed home, until her fairy godmother appeared! With a wave of her wand, Cinderella was dressed in a beautiful gown with glass slippers, and a pumpkin became a shining carriage.',
    conclusion:
      'Cinderella and the prince lived happily ever after. Kindness is the most beautiful thing anyone can wear. No matter how hard life gets, a gentle heart always shines.',
    questions: [
      'What made Cinderella special even though she had a hard life?',
      'What do you think the glass slipper represents?',
      'If you had a fairy godmother, what would you wish for?',
    ],
    narrator: 'Sofia R.',
    originalAuthor: 'Charles Perrault',
    image: 'https://picsum.photos/seed/cinderella/600/400',
    audioUrl: null,
    videoUrl: null,
    isFavorite: false,
  },
  {
    id: 'sleeping-beauty',
    subcategoryId: 'goodnight',
    title: 'Sleeping Beauty',
    shortDescription: 'A princess falls into a magical sleep, waiting for true love.',
    storyDescription:
      'A beautiful princess was born in a great kingdom. Fairies gave her wonderful gifts: grace, kindness, and a cheerful laugh. But an uninvited fairy cast a dark spell: on her sixteenth birthday, she would prick her finger on a spindle and fall into a deep sleep. The whole kingdom tried to keep her safe, but the day came. She fell asleep, and the entire castle slept with her, covered in roses.',
    conclusion:
      'A brave prince found the sleeping princess and woke her. True love, patience, and courage can break even the deepest spells.',
    questions: [
      'How did the kingdom try to protect the princess?',
      'What do you think courage means in this story?',
      'If you could give someone a magical gift, what would it be?',
    ],
    narrator: 'Sofia R.',
    originalAuthor: 'Charles Perrault',
    image: 'https://picsum.photos/seed/sleeping-beauty/600/400',
    audioUrl: null,
    videoUrl: null,
    isFavorite: false,
  },
  {
    id: 'goldilocks',
    subcategoryId: 'goodnight',
    title: 'Goldilocks and the Three Bears',
    shortDescription: 'A curious girl finds a cosy bear family home in the woods.',
    storyDescription:
      "While three bears went for a walk to let their porridge cool, a curious girl with golden curls named Goldilocks wandered into their cottage. She tried the porridge: one was too hot, one too cold, one just right. She tried the chairs and finally the beds, and fell fast asleep in the smallest one.",
    conclusion:
      "When the bears returned, they found Goldilocks asleep! She woke up and ran home. She learned that it is important to respect other people's belongings.",
    questions: [
      'Why was the smallest porridge just right?',
      'What should Goldilocks have done before entering the house?',
      'Have you ever been curious about something you should not have touched?',
    ],
    narrator: 'Marco T.',
    originalAuthor: 'Robert Southey',
    image: 'https://picsum.photos/seed/goldilocks/600/400',
    audioUrl: null,
    videoUrl: null,
    isFavorite: false,
  },
];

export function getSubcategory(id: string): StorySubcategory | undefined {
  return storySubcategories.find((s) => s.id === id);
}

export function getStoriesBySubcategory(subcategoryId: string): Story[] {
  return stories.filter((s) => s.subcategoryId === subcategoryId);
}

export function getStoryById(id: string): Story | undefined {
  return stories.find((s) => s.id === id);
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
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
];

