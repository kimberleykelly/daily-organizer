require('dotenv').config()
const { DefinePlugin } = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  devServer: {
    port: 3000,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.png/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        RAPIDAPIHOST: JSON.stringify(process.env.RAPIDAPIHOST),
        RAPIDAPIKEY: JSON.stringify(process.env.RAPIDAPIKEY),
      },
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
}
