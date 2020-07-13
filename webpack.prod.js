const merge = require('webpack-merge');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'bundle.js',
  },
  optimization: {
    minimizer: [new TerserWebpackPlugin()],
  }
});