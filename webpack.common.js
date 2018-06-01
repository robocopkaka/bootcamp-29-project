const path = require('path');
const Dotenv = require('dotenv-webpack');
// require("babel-polyfill");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/public/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'client', 'public'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', query: {
        "presets":[
            "latest", "react",  "stage-0", "react-hmre"
        ],
        "plugins": ["transform-regenerator"]
      }, exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader', include: __dirname + '/client'},
      { test: /\.css$/, loader: 'css-loader', query: {
        modules: true,
        localIdentName: '[name]__[local]___[hash:base64:5]'
      }, include: __dirname + '/client'},
      { test: /\.(png|jpg|jpeg)$/, loader: 'url-loader?limit=8192' }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new Dotenv()
  ],
  resolve: {
    extensions: ['.js', '.css', '.jsx'],
    modules: [
      'node_modules'
    ],
    alias: {
      react: path.resolve('./node_modules/react'),
    }
  }
}
