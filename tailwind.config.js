// medspasync-frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default { // Use export default here too if Vite's default config uses it
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // Ensure both .js and .jsx are covered
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};