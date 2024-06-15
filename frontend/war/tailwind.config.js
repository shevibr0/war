/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      /** @type {import('tailwindcss').Config} */
      module.exports = {
        content: ["./src/**/*.{js,jsx,ts,tsx}"],
        theme: {
          extend: {
            fontFamily: {
              sans: ['Rubik', 'sans-serif'],
            },
            // Custom utilities
            utilities: {
              '.writing-mode-vertical-rl': {
                writingMode: 'vertical-rl',
              },
              '.rotate-180': {
                transform: 'rotate(180deg)',
              },
            }
          },
        },
        plugins: [],
      }
      ,
      // Add custom utilities to extend
      utilities: {
        '.writing-mode-vertical-rl': {
          writingMode: 'vertical-rl',
        },
        '.rotate-180': {
          transform: 'rotate(180deg)',
        },
      }
    },
  },
  plugins: [],
}
