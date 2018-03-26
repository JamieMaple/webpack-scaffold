const webpack = require('webpack')
const chalk = require('chalk')
const merge = require('webpack-merge')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const progress = require('progress-bar-webpack-plugin')
const { resolve } = require('./helpers')
const common = require('./webpack.common')

const compiler = webpack(merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      name: 'common'
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: [
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
