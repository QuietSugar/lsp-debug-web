const path = require('path');
const StringReplacePlugin = require("string-replace-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: './index.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.js$/,
        loader: './replace-str-loader'
      },
      {
        test: /\.code$/,
        use: 'raw-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.js' ]
  },
  target: 'web',
  node: {
    net: 'mock',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};
