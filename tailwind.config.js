/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      thin: ['ui-sans-serif', 'Roboto Thin'],
      normal: ['ui-sans-serif', 'Roboto Light'],
      bold: ['ui-sans-serif', 'Roboto Regular'],
    },
    fontSize: {
      sm: '1rem',
      base: '1.3rem',
      xl: '1.6rem',
      '2xl': '1.8rem',
      '3xl': '2rem',
      '4xl': '2.2rem',
      '5xl': '3rem',
    },
    extend: {},
  },
  plugins: [],
};
