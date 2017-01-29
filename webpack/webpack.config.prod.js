const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')

module.exports = {
  entry: {
    main: resolve(__dirname, '../src'),
    vendor: [
      'preact',
      'preact-compat',
      'preact-redux',
      'react-router-dom',
      'redux',
      'redux-thunk',
      'styled-components',
    ],
  },
  resolve: {
    alias: {
      'react-redux': 'preact-redux',
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    },
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          resolve(__dirname, '../src'),
          resolve('node_modules/preact-compat/src'),
        ],
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'redux-react-starter',
      template: 'webpack/template.html',
    }),
    new OfflinePlugin({
      ServiceWorker: {
        navigateFallbackURL: '/',
      },
      AppCache: false,
    }),
  ],
}
