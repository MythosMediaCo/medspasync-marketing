/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medical: {
          blue: '#0066cc',
          green: '#28a745',
          amber: '#ffc107',
          red: '#dc3545'
        }
      }
    },
  },
  plugins: [],
}
