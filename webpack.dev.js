const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const Dotenv = require('webpack-dotenv');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    clientBase: '/client/public'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv()
  ]
});
