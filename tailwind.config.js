import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/index.html", 
  ],
  theme: {
    
    extend: {},
  },
  daisyui: {
    themes: ["fantasy", "dark", "cupcake"],
  },
  plugins: [
    daisyui
  ],
}

