const HtmlWebpackPlugin = require('html-webpack-plugin')
const { publicPath, isDev, htmlConfig } = require('./config')
const { resolve } = require('./helpers')

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: resolve('dist'),
    publicPath: publicPath,
    filename: 'js/[name].[hash:7].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      ...htmlConfig
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            publicPath: publicPath,
            name: 'img/[name].[hash:7].[ext]',
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            publicPath: publicPath,
            name: 'fonts/[name].[hash:7].[ext]',
          }
        }
      }
    ]
  }
}
