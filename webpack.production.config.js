var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

var nodeExternals = require('webpack-node-externals');

var { eslintLoader, babelLoader, postcssLoader } = require('./webpack.common.js')

module.exports = [
  {
    entry: path.resolve(__dirname, './src/server.js'),
    output: {
      path: path.resolve(__dirname, './dist/'),
      filename: 'server.js',
    },
    target: 'node',
    devtool: 'sourcemap',
    externals: nodeExternals(),
    plugins: [
      new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}})
    ],
    module: {
      loaders: [
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
      new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, sourceMap: false }),
      new ExtractTextPlugin('styles.css', {
        allChunks: true
      }),
      new TransferWebpackPlugin([ { from: 'public' } ])
    ],
    module: {
      loaders: [
        eslintLoader,
        babelLoader,
        {
          test: /\.(css|less)$/,
          loader: ExtractTextPlugin.extract(
            {
              fallback: {
                loader: 'style-loader',
                options: { hmr: false, sourceMap: true }
              },
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 2,
                    minimize: true,
                    sourceMap: true,
                  },
                },
                postcssLoader,
                {
                  loader: 'less-loader',
                  options: { sourceMap: true }
                }
              ]
            }
          )
        },
      ]
    }
  }
];
