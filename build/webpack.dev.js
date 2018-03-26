const webpack = require('webpack')
const merge = require('webpack-merge')
const friendlyError = require('friendly-errors-webpack-plugin')
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
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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
  quiet: true
}))

app.use(require('webpack-hot-middleware')(compiler, {
  log: () => {}
}))

app.listen(port, () => {
  console.log('> Starting server...')
})