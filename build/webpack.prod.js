const webpack = require('webpack')
const chalk = require('chalk')
// bug-flag
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const progress = require('progress-bar-webpack-plugin')
const { resolve } = require('./helpers')
const common = require('./webpack.common')

const compiler = webpack(merge(common, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
         test: /node_modules/,
         chunks: 'initial',
         name: 'vendor',
         priority: 10,
         enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(css|sss|scss)$/,
        use: [
          miniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: true,
              modules: true,
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: 'css/[name].[hash:7].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new cleanWebpackPlugin(['dist'], {
      root: resolve('.'),
      exclude: ['build/*.js', 'src/*.js'],
    }),
    new progress({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: true,
    })
  ]
}), (err, stats) => {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
    entrypoints: false,
  }) + '\n\n')
})
