var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

var nodeExternals = require('webpack-node-externals');

var { eslintLoader, babelLoader, postcssLoader } = require('./webpack.common.js')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, './src/browser.js')
  ],
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: 'dist/',
    hot: true,
    watchContentBase: true,
    host: 'localhost',
    port: 3000,
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new TransferWebpackPlugin([ { from: 'public' } ])
  ],
  module: {
    rules: [
      eslintLoader,
      babelLoader,
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          postcssLoader,
          'less-loader',
        ],
      },
    ]
  }
};
