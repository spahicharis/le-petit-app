/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './constants/**/*.{js,ts,tsx}',
    './store/**/*.{js,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#F9A825',
        'primary-dark': '#F57F17',
        secondary: '#FF6B6B',
        accent: '#4FC3F7',
        background: '#FFF8F0',
        surface: '#FFFFFF',
        muted: '#9E9E9E',
        border: '#EEE8DC',
      },
    },
  },
  plugins: [],
};
