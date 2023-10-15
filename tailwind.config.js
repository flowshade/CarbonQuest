/** @type {import('tailwindcss').Config} */
import colors from "@tailwind/colors";
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      colors: {
        'green': '#283D34',
        'gray': '#F0F0F0',
        'gray-light': '#F6F6F6',
        'black': '#000000'
      }
    },
  },
  plugins: [],
}

