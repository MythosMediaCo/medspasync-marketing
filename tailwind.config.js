// medspasync-frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default { // Use export default for ESM compatibility
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // Ensure both .js and .jsx files are scanned
  ],
  theme: {
    extend: {
      // Customizations for your theme (colors, fonts, etc.) would go here
    },
  },
  plugins: [], // Any Tailwind plugins would be listed here
};