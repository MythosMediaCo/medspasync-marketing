// medspasync-frontend/postcss.config.js
export default {
  plugins: {
    // Change 'tailwindcss' to '@tailwindcss/postcss'
    '@tailwindcss/postcss': {}, // This is the correct way to use the v4 plugin
    autoprefixer: {},
  },
};