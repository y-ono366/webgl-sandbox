module.exports = {
  plugins: ['stylelint-scss'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'color-no-invalid-hex': [true],
    'color-named': 'never',
    'color-hex-case': ['lower']
  }
}
