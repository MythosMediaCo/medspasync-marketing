// medspasync-frontend/postcss.config.js
// This file must use ES module syntax (export default) for Vite
export default {
  plugins: {
    // This is the correct plugin name for Tailwind CSS v4 (PostCSS plugin)
    '@tailwindcss/postcss': {},
    // Autoprefixer is typically included for vendor prefixes
    autoprefixer: {},
  },
};