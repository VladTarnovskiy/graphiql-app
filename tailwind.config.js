/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      thin: ['ui-sans-serif', 'Roboto Thin'],
      normal: ['ui-sans-serif', 'Roboto Light'],
      bold: ['ui-sans-serif', 'Roboto Regular'],
    },
    extend: {
      screens: {
        xs: { max: '480px' },
        sm: { max: '576px' },
        md: { max: '768px' },
        lg: { max: '992px' },
        xl: { max: '1200px' },
        '2xl': { max: '1336px' },
        '3xl': { max: '1576px' },
      },
      colors: {
        base_green: '#14b8a6',
        base_green_light: '#2dd4bf',
        base_yellow: '#fde047',
        base_grey: '#9ca3af',
        base_dark: '#374151',
        base_light: '#e5e5e5',
        base_white: '#fafafa',
      },
      fontSize: {
        sm: '1rem',
        base: '1.3rem',
        xl: '1.6rem',
        '2xl': '1.8rem',
        '3xl': '2rem',
        '4xl': '2.2rem',
      },
    },
  },
  plugins: [],
};
