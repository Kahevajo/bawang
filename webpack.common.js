var eslintLoader = {
  enforce: "pre",
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: "eslint-loader",
  options: {
    emitError: true,
    emitWarning: true,
  },
}

var babelLoader = {
  test: /\.jsx?$/,
  loader: 'babel-loader',
  options: {
    babelrc: false,
    presets: ['env', 'react', 'stage-3'],
    plugins: ['transform-class-properties'],
    compact: true,
  },
}

var autoprefixer = require('autoprefixer');
var postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    // Necessary for external CSS imports to work
    // https://github.com/facebookincubator/create-react-app/issues/2677
    ident: 'postcss',
    plugins: () => [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
        flexbox: 'no-2009',
      }),
    ],
  }
}

module.exports = {
  eslintLoader,
  babelLoader,
  postcssLoader
}
