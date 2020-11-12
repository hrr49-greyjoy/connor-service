const path = require('path');

module.exports = {
  entry: './client/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dist')
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      exclude: /node_modules/,
      loader: `babel-loader`
    }]
  },
  mode: 'development'
}