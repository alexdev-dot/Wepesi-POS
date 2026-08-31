/** @type {import('tailwindcss').Config} */
module.exports = {
  // This config is for VS Code Tailwind IntelliSense extension only
  // Tailwind v4 uses CSS-based configuration via @theme in globals.css
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
