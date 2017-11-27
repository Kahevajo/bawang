var webpack = require('webpack');
var path = require('path');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var ReloadServerPlugin = require('reload-server-webpack-plugin');

var nodeExternals = require('webpack-node-externals');

var { eslintLoader, babelLoader, postcssLoader } = require('./webpack.common.js')

module.exports = [
  {
    target: 'node',
    devtool: 'sourcemap',
    entry: path.resolve(__dirname, './src/server.js'),
    output: {
      path: path.resolve(__dirname, './dist/'),
      filename: 'server.js',
    },
    plugins: [
      new ReloadServerPlugin({
        script: path.resolve(__dirname, './dist/server.js'),
      }),
    ],
    externals: nodeExternals(),
    module: {
      rules: [
        eslintLoader,
        babelLoader,
        {
          test: /\.(css|less)$/,
          use: 'css-loader'
        }
      ]
    }
  },
  {
    devtool: 'sourcemap',
    entry: path.resolve(__dirname, './src/browser.js'),
    output: {
      path: path.resolve(__dirname, './dist/'),
      filename: 'bundle.js'
    },
    plugins: [
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
            'less-loader'
          ],
        },
      ]
    }
  }
];
