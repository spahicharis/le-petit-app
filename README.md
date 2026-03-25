# LePetit.app

A storytelling book app for kids built with Expo, React Native, and TypeScript.

## Overview

LePetit.app is a friendly, child-focused storytelling platform that brings rich media content to young readers. The app organizes stories into categories and subcategories, supports multimedia playback, and offers a guest-friendly experience alongside subscription functionality for parents and guardians.

## Features

- 📚 **Rich Story Library** - Stories organized by categories and subcategories (e.g., tales about animals, good night tales)
- 🎬 **Multimedia Support** - Cover images, narration, audio, and video playback
- ⭐ **Favorites & Sharing** - Mark favorite stories and share with others
- 👨‍👩‍👧 **Parent Resources** - FAQ and parent-focused content
- 📱 **Cross-Platform** - Run on iOS, Android, and Web
- 🔐 **Flexible Auth** - Continue as a guest or sign in with email, Apple, or Google
- 🎨 **Dark & Light Themes** - Full theme support for comfortable reading

## Tech Stack

- **Framework**: Expo SDK 54
- **UI Framework**: React Native 0.81
- **React Version**: 19
- **Language**: TypeScript (strict mode)
- **Routing**: Expo Router with typed routes
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Package Manager**: npm
- **Babel Compiler**: React Compiler enabled

## Project Structure

```
LePetitApp/
├── app/                    # Expo Router routes and layouts
│   ├── (auth)/            # Authentication screens
│   ├── (app)/             # Main app shell
│   │   └── (tabs)/        # Bottom tab navigation
│   └── index.tsx          # Root entry point
├── components/            # Reusable React components
│   └── ui/               # Lower-level UI primitives
├── constants/            # Theme tokens, i18n, and shared constants
├── hooks/                # Custom platform-aware hooks
├── services/             # API and business logic
├── store/                # State management
└── assets/               # Icons, images, and splash screens
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Expo CLI (optional but recommended)

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

### Linting

```bash
# Check code quality
npm run lint
```

## App Structure

### Navigation

- **Login Flow**: Welcome screen with branding and sign-in options
- **Bottom Tabs**: Home, Notifications, Search, Favorites
- **Main Content**:
  - Tales: Browse stories by category and subcategory
  - For Parents: FAQ and parent resources
  - My Logoped: Personalized content area
- **Story Detail**: Rich media player with metadata, sharing, and favorites

### Data Model

Core entities:
- **StoryCategory**: Top-level organization (e.g., "Tales")
- **StorySubcategory**: Groupings within categories (e.g., "Animals")
- **Story**: Individual story with metadata, media, and actions

## Planned Phases

1. **Phase 1**: Route structure, tab shell, and auth flow
2. **Phase 2**: Home, Tales, subcategories, story details, and parent content
3. **Phase 3**: Favorites, search, notifications, and media actions
4. **Phase 4**: Real authentication, subscriptions, and backend integration

## Conventions

- Use path alias `@/*` for imports from project root
- Keep dark/light theme support intact
- Prefer functional components and `StyleSheet.create()` styling
- Reuse theme values from `constants/theme.ts`
- Maintain cross-platform behavior (iOS, Android, Web)

## Contributing

When making changes:
- Follow existing functional component patterns
- Match styling conventions with React Native and NativeWind
- Run linting before submitting changes
- Test on multiple platforms when modifying navigation, layouts, or platform-specific behavior

## License

TBD

