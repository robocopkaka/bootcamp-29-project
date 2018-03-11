const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader'},
      { test: /\.css$/, loader: 'css-loader', query: {
        modules: true,
        localIdentName: '[name]__[local]___[hash:base64:5]'
      }},
      { test: /\.(png|jpg|jpeg)$/, loader: 'url-loader?limit=8192' }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [HtmlWebpackPluginConfig],
  resolve: {
    extensions: ['.js', '.css', '.jsx'],
    modules: [
      'node_modules'
    ]
  }
}
