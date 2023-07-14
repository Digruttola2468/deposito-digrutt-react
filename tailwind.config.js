/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gris-oscuro': '#484848',
        'celeste-oscuro': '#006465',
        'celeste-claro': '#0f928c',
        'celeste': '#00c9d2',
        'verde': '#beee3b',
        'white': '#fff',
        'blue-400': '#1976d2'
      }
      
    },
    fontFamily: {
      'bruno': ['"Bruno Ace SC"']
    }
  },
  plugins: [],
}

