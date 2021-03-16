module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing:{
        '50':'12.5rem'
      }
    },
    borderColor:theme=>({
      DEFAULT: theme('colors.gray.300', 'currentColor'),
      'grey': '#cccccc',
    })
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
