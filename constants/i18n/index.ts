/**
 * i18n setup for LePetit.app
 *
 * Supported locales:
 *  - en  English (default / fallback)
 *  - bs  Bosnian
 *
 * The device locale is used as the initial language.
 * Language can be changed at runtime via i18n.changeLanguage().
 *
 * Import this file once at the app root:
 *   import '@/constants/i18n';
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './en';
import bs from './bs';

export type SupportedLocale = 'en' | 'bs';
export const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'bs'];

export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  en: '🇬🇧 EN',
  bs: '🇧🇦 BS',
};

/** Resolve device locale to a supported locale, defaulting to English. */
function detectLocale(): SupportedLocale {
  const deviceCode = Localization.getLocales()[0]?.languageCode ?? 'en';
  return SUPPORTED_LOCALES.includes(deviceCode as SupportedLocale)
    ? (deviceCode as SupportedLocale)
    : 'en';
}

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    bs: { translation: bs },
  },
  lng: detectLocale(),
  fallbackLng: 'en',
  interpolation: {
    // React Native renders JSX, not HTML — escaping is not needed.
    escapeValue: false,
  },
  // Keep translations synchronous (no backend / lazy loading needed).
  initImmediate: false,
});

export default i18n;

