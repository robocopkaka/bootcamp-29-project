const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const dotenv = require('dotenv');
const path = require('path');
const common = require('./webpack.common.js');

dotenv.config();
module.exports = merge(common, {
  plugins: [
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.DB_USER': JSON.stringify('process.env.DB_USER'),
      'process.env.DB_PASS': JSON.stringify('process.env.DB_PASS'),
      'process.env.secret': JSON.stringify('process.env.secret'),
      'process.env.AWS_ACCESS_KEY_ID': JSON.stringify('process.env.AWS_ACCESS_KEY_ID'),
      'process.env.AWS_SECRET_ACCESS_KEY': JSON.stringify('process.env.AWS_SECRET_ACCESS_KEY'),
      'process.env.S3_BUCKET': JSON.stringify('process.env.S3_BUCKET'),
      'process.env.API_HOST': JSON.stringify('process.env.API_HOST'),
      'process.env.PORT': JSON.stringify('process.env.PORT'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.css', '.jsx'],
    modules: [
      'node_modules'
    ],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom')
    }
  }
});
