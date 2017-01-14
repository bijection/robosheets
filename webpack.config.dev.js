var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    browser: [
      'webpack-hot-middleware/client',
      './src/browser/index.js'
    ],
    worker: [
      './src/worker/index.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: [path.join(__dirname, 'src')]
    }]
  },
  node: {
    fs: "empty"
  }
};