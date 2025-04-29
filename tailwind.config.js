/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#2D3748',
        teal: '#319795',
        'teal-hover': '#4FD1C5',
      },
    },
  },
  plugins: [],
}