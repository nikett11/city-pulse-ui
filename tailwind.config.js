/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBackground: '#2c2c2c',
        customText: '#DFDFDF',
      }
    },
  },
  plugins: [],
}
