const typography = require('tailwindcss-typography')


module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing:{
        '50':'12.5rem'
      }
    },
    textIndent:{
      '1':'0.25rem',
      '2':'0.5rem',
    },
    borderColor:theme=>({
      DEFAULT: theme('colors.gray.300', 'currentColor'),
      'grey': '#cccccc',
    })
  },
  variants: {
    extend: {},
  },
  plugins: [
    typography({
      // all these options default to the values specified here
      ellipsis: true,         // whether to generate ellipsis utilities
      hyphens: true,          // whether to generate hyphenation utilities
      kerning: true,          // whether to generate kerning utilities
      textUnset: true,        // whether to generate utilities to unset text properties
      componentPrefix: 'c-',  // the prefix to use for text style classes
    }) 
  ],
}
