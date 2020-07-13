const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    https: false,
    host: '0.0.0.0',
    port: 3000,
    contentBase: './dist',
    hot: true,
    proxy: [
      {
        context: [
          '/api',
          '/storage',
          '/static/wwwRoot',
          '/static/file',
        ],
        target: 'https://localhost',
        secure: false,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
});