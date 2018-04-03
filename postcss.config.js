module.exports = {
  parser: 'postcss-scss',
  plugins: [
    require('postcss-cssnext')({
      browsers: ['last 2 versions'],
      features: {
        rem: false
      }
    }),
    require('postcss-for'),
    require('postcss-nested'),
    require('postcss-calc'),
    // require('postcss-modules')
  ]
}