/** Shared design tokens for LePetit.app – warm dark palette (night-friendly) */

export const colors = {
  primary: '#FFA726',      // warm amber – pops against dark backgrounds
  primaryDark: '#E65100',  // deep burnt orange
  secondary: '#F06060',    // soft coral
  accent: '#4DB6E8',       // muted sky blue
  background: '#1E1A14',   // very dark warm brown – main canvas
  surface: '#28231A',      // slightly lighter – cards & sheets
  cardBg: '#312B1F',       // subtle card lift
  text: '#EDE0C4',         // warm cream – easier on eyes than pure white
  textMuted: '#7A6A54',    // warm brown-grey
  textLight: '#FFFFFF',    // for text on coloured/gradient backgrounds
  border: '#3D3424',       // dark warm border
  success: '#66BB6A',
  tabBar: '#1E1A14',       // matches background
  tabBarActive: '#FFA726', // amber stays
  tabBarInactive: '#52422E', // warm muted inactive
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
