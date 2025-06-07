/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",     # Adjusted for Vite's default index.html location
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
