/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        '.scrollbar': {
          overflowY: 'auto',
          scrollbarColor: `${theme('colors.sky.600')} ${theme('colors.sky.200')}`,
          scrollbarWidth: 'auto',
        },
        '.scrollbar::-webkit-scrollbar': {
            height: '2px',
            width: '2px',
        },
        '.scrollbar::-webkit-scrollbar-thumb': {
            backgroundColor: theme('colors.sky.600'),
        },
        '.scrollbar::-webkit-scrollbar-track-piece': {
            backgroundColor: theme('colors.sky.200'),
        },
      });
    }),
  ],
  corePlugins: {
    preflight: false,
  },
}
