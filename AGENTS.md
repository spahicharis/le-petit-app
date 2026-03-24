# AGENTS.md

## Purpose

This repository is a small Expo app built with Expo Router, React Native, and TypeScript. Use this file as the working guide for coding agents making changes in this project.

## Product Context

This app is intended to become a storytelling book app for kids.

Core product direction:

- The app organizes content into story categories and subcategories.
- Each story is a rich media item, not just plain text.
- The app will support a subscription pricing model, but guests must still be able to continue without logging in.
- The experience should feel friendly for children while remaining useful for parents.

Planned story metadata and actions:

- Cover image
- Short description
- Full story content or story description
- Conclusion
- Questions for kids
- Narrator
- Original author
- Audio file
- Video file or external video link
- Favorite action
- Share action
- Download action

When implementing story-related features, prefer data models and UI patterns that can support all of the fields above even if a screen initially shows only a subset.

## Project Snapshot

- App name: `LePetit.app`
- Framework: Expo SDK 54
- Routing: `expo-router`
- React: 19
- React Native: 0.81
- Language: TypeScript with `strict: true`
- Package manager: `npm` with `package-lock.json`

## Repository Layout

- `app/`: Expo Router routes and layouts
- `components/`: shared UI components
- `components/ui/`: lower-level reusable UI pieces
- `constants/`: theme tokens and shared constants
- `hooks/`: platform-aware hooks
- `assets/`: icons, images, and splash assets
- `scripts/reset-project.js`: helper script from the Expo starter

Important: this project currently uses the default Expo Router `app/` directory for routes.

## Planned App Structure

Primary navigation:

- Login screen
  - Branding
  - `Continue without login` action
  - Apple Sign-In and Google Sign-In options
- Bottom tabs:
  - Home
  - Notifications
  - Search
  - Favorites
- Home content areas:
  - Tales
  - For parents
  - My logoped
- Tales content hierarchy:
  - Tales landing screen with subcategory list
  - Subcategory screens with story lists
- Story detail screens
  - Story content and metadata
  - Favorite, share, download actions
  - Audio and video playback if media is available
- For parents content:
  - FAQ-style content with common questions about the app
  - Additional parent-focused content in the future
- My logoped content:
  - Placeholder for now, but could include personalized content or progress tracking in the future

Authentication requirements:

- Support login because the product will use subscriptions.
- Allow continuing without login.
- Plan for Apple Sign-In and Google Sign-In.

Home sections:

- Tales
- For parents
- My logoped

Tales hierarchy:

- Tales contain subcategories such as:
  - Tales about animals
  - Good night tales
  - Additional tale groupings in the future
- Each subcategory contains individual tales such as:
  - Bambi
  - Pinocchio
  - Additional titles in the future

Section expectations:

- `For parents`: FAQ-style content with several questions about the app.
- `My logoped`: leave empty for now unless the task explicitly adds content there.

Implementation note: keep navigation and data structures flexible enough to support many categories, nested sections, and future content expansion.

## Expo Router Screen Plan

Recommended route structure for upcoming work:

- `app/_layout.tsx`
  - Root app providers
  - Auth/session bootstrap
  - Redirect logic between auth flow and main app flow
- `app/(auth)/`
  - Route group for authentication-related screens
- `app/(auth)/welcome.tsx`
  - Entry screen with branding, subscription messaging, and a `Continue without login` action
- `app/(auth)/login.tsx`
  - Email/login options plus Apple and Google sign-in entry points
- `app/(app)/`
  - Main authenticated or guest-accessible app shell
- `app/(app)/_layout.tsx`
  - Sidebar or drawer navigation wrapper for the main experience
- `app/(app)/(tabs)/`
  - Bottom-tab route group
- `app/(app)/(tabs)/tales.tsx`
  - Home tab
- `app/(app)/(tabs)/notifications.tsx`
  - Notifications tab
- `app/(app)/(tabs)/search.tsx`
  - Search tab
- `app/(app)/(tabs)/favorites.tsx`
  - Favorites tab
- `app/(app)/tales/tales.tsx`
  - Tales landing screen with subcategories
- `app/(app)/tales/[subcategory].tsx`
  - Dynamic subcategory screen such as animals or good-night tales
- `app/(app)/story/[storyId].tsx`
  - Story detail screen
- `app/(app)/parents/tales.tsx`
  - For parents FAQ screen
- `app/(app)/my-logoped/tales.tsx`
  - Empty placeholder screen for now

Recommended navigation behavior:

- Root flow decides whether the user sees auth onboarding first or continues into the app as a guest.
- The sidebar should expose the main content areas, especially `Tales`, `For parents`, and `My logoped`.
- Bottom tabs should always expose `Home`, `Notifications`, `Search`, and `Favorites`.
- `Home` should act as a content hub and link into `Tales`, `For parents`, and `My logoped`.
- Story browsing should follow this path:
  - Home -> Tales
  - Tales -> subcategory
  - Subcategory -> story detail

Recommended data shape:

- `StoryCategory`
  - `id`
  - `title`
  - `description`
  - `image`
- `StorySubcategory`
  - `id`
  - `categoryId`
  - `title`
  - `description`
  - `image`
- `Story`
  - `id`
  - `subcategoryId`
  - `title`
  - `shortDescription`
  - `storyDescription`
  - `conclusion`
  - `questions`
  - `narrator`
  - `originalAuthor`
  - `image`
  - `audioUrl`
  - `videoUrl`
  - `isFavorite`

Suggested implementation phases:

- Phase 1: establish route groups, tab shell, placeholder screens, and guest/auth entry flow
- Phase 2: build `Home`, `Tales`, subcategory, story detail, and `For parents`
- Phase 3: add favorites, search, notifications, and richer story media actions
- Phase 4: connect real authentication, subscriptions, and backend content

Current-repo note:

- The project currently has `app/(tabs)/tales.tsx` and `app/(tabs)/explore.tsx`.
- Tab navigation is currently configured in `app/(tabs)/_layout.tsx`.
- When implementing the plan above, it is reasonable to replace the starter `Explore` route with the new tab and content structure.

## Common Commands

- Install dependencies: `npm install`
- Start dev server: `npm run start`
- Run on iOS: `npm run ios`
- Run on Android: `npm run android`
- Run on web: `npm run web`
- Lint: `npm run lint`
- Reset starter content: `npm run reset-project`

## Coding Conventions

- Prefer keeping new code inside existing top-level app folders such as `app/`, `components/`, `constants/`, and `hooks/`.
- Use the existing path aliases:
  - `@/*` -> project root (`./*`)
- Follow existing functional component patterns.
- Match existing styling conventions with `StyleSheet.create(...)` for React Native components.
- Reuse shared theme values from `constants/theme.ts` instead of hardcoding spacing/sizing when possible.
- Preserve cross-platform behavior for `android`, `ios`, and `web`.
- Keep dark/light theme support intact.

## React And Expo Notes

- `app.json` enables `experiments.reactCompiler`; avoid adding unnecessary memoization patterns unless there is a measured need.
- Typed routes are enabled, so route changes should stay compatible with Expo Router conventions.
- Web-specific and native-specific behavior may live in separate files such as `*.web.tsx` or `*.web.ts`.
- Nativewind is configured via `babel.config.js`, `tailwind.config.js`, and `global.css`; keep Tailwind `content` paths in sync with directories where `className` is used.

## Validation Expectations

Before finishing substantial changes:

- Run `npm run lint`.
- If you changed navigation, layouts, animations, or platform-specific behavior, also run the relevant Expo target when practical.
- Call out anything you could not verify locally.

## Editing Guidance For Agents

- Make focused changes that fit the current structure instead of introducing new architectural patterns.
- Do not remove or overwrite user changes you did not make.
- Prefer small, composable components over large screen-level rewrites.
- When touching starter content, keep naming and file placement aligned with Expo Router expectations.
- If you add dependencies, explain why they are needed and keep them minimal.

## Known Gaps

- The repository currently has linting configured, but no visible dedicated test suite.
- The root `README.md` still contains starter-template wording and may not reflect the current app structure and planned screens.
