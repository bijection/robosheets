var path = require('path');
var webpack = require('webpack');

module.exports = {
  // devtool: 'source-map',
  entry: {
    browser: [
      './src/browser/index.js'
    ],
    worker: [
      './src/worker/index.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
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
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: [path.join(__dirname, 'src')]
    }]
  },
  node: {
    'fs': 'empty',
  }
};
