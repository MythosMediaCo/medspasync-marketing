// medspasync-frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4ade80',
          DEFAULT: '#16a34a',
          dark: '#166534',
        },
        secondary: {
          light: '#93c5fd',
          DEFAULT: '#3b82f6',
          dark: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
