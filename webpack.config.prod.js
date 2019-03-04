var path = require('path')
var webpack = require('webpack')

module.exports = {
  // devtool: 'source-map',
  entry: {
    spreadsheet: ['./src/browser/index.js'],
    worker: ['./src/worker/index.js'],
    gui: ['./src/gui/index.js']
  },
  output: {
    path: path.join(__dirname, 'web', 'dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: [path.join(__dirname, 'src')]
      }
    ]
  },
  node: {
    fs: 'empty'
  }
}
