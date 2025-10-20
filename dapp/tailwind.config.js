/** @type {import('tailwindcss').Config} */
export default {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'moca-blue': '#1E40AF',
        'moca-purple': '#6B46C1',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
      },
    },
  },
  darkMode: 'class', // Enable dark mode
  plugins: [],
};