const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractText = require('extract-text-webpack-plugin')
const friendlyError = require('friendly-errors-webpack-plugin')
const open = require('open')
const { port, publicPath } = require('./config')
const { resolve } = require('./helpers')
const common = require('./webpack.common')

// add hot-reload for each
Object.keys(common.entry).forEach(name => {
  common.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(common.entry[name])
})

const compiler = webpack(merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(css|sss|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              module: true,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    // error emits
    new friendlyError({
      compilationSuccessInfo: {
        messages: [`You application is running here http://localhost:${port}`],
        notes: ['Some additionnal notes to be displayed unpon successful compilation']
      },
      clearConsole: true,
    })
  ]
}))

// hmr

const app = require('express')()

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: publicPath,
  contentBase: resolve('static/'),
  quiet: true,
  stats: {
    colors: true,
    modules: false,
    modulesSort: "field",
    entrypoints: false,
    children: false,
  }
}))

app.use(require('webpack-hot-middleware')(compiler, {
  log: () => {}
}))

app.listen(port, () => {
  console.log('> Starting server...')
  open(`http://localhost:${port}`)
})