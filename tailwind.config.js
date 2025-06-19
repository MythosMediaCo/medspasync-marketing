/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
          light: '#8b5cf6',
        },
      },
      boxShadow: {
        card: '0 20px 25px -5px rgba(31,41,55,0.1), 0 10px 10px -5px rgba(31,41,55,0.04)',
      },
    },
  },
  plugins: [],
};
