/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <--- This enables your Dark Mode toggle
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}