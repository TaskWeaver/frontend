/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './**/*.tsx'],
  theme: {
    borderRadius: {
      DEFAULT: '8px',
      lg: '25px',
      full: '9999px',
    },
    colors: {
      theme: {
        DEFAULT: '#20B767',
        light: '#CCF0DD',
        muted: '#AFDDC5',
        dark: ' #078E47',
      },
      white: '#FFFFFF',
      black: '#000000',
      gray: {DEFAULT: '#C7C7C9', light: '#D9D9D9', lighter: '#EAEAEA'},
      red: {DEFAULT: '#FF0000', light: '#FFCACE'},
      background: {DEFAULT: '#FAFAFA', black: 'rgba(0,0,0,0.25)'},
    },
  },
  plugins: [],
};
