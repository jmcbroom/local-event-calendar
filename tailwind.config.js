module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: `media`,
  theme: {
    extend: {
      borderWidth: {
        1: '1px'
      },
      colors: {
        // https://colors.muz.li/palette/518173/d8dace/77b6c0/283533/96c465
        'primary': '#d8dace',
        'secondary': '#283533',
        'tertiary': '#77b6c0',
        'venue': '#77b6c0',
        // 'venue': '#518173',
        'event': '#96c465',
        'link': '#2a4192'
      },
      gridTemplateColumns: {
        'filters': '2fr 3fr',
        'venue': '3fr 2fr'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-underline-utils')
  ],
}
