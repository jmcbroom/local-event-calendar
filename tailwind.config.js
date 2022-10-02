module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: `media`,
  theme: {
    extend: {
      colors: {
        'primary': '#798487',
        'secondary': '#2B2D34',
        'tertiary': '#88291F',
      },
      borderWidth: {
        1: '1px'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-underline-utils')
  ],
}
