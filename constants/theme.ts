/** Shared design tokens for LePetit.app */

export const colors = {
  primary: '#F9A825',      // amber – warm, inviting
  primaryDark: '#F57F17',
  secondary: '#FF6B6B',    // coral – playful
  accent: '#4FC3F7',       // sky blue – dreamy
  background: '#FFF8F0',   // warm cream
  surface: '#FFFFFF',
  cardBg: '#FFFDF7',
  text: '#2D2D2D',
  textMuted: '#9E9E9E',
  textLight: '#FFFFFF',
  border: '#EEE8DC',
  success: '#66BB6A',
  tabBar: '#FFFFFF',
  tabBarActive: '#F9A825',
  tabBarInactive: '#BDBDBD',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 28,
  full: 999,
} as const;

export const fontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 22,
  xxl: 28,
  hero: 36,
} as const;

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
} as const;

