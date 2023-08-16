const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'production',
  output: {
    filename: 'popup.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'app/static', to: path.resolve('dist') },
        {from: 'app/soundFiles', to: 'soundFiles'}
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx']
        },
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
              '@babel/preset-env', {
                modules: false,
                loose: true
                }
              ],
              '@babel/preset-react'
            ],
          }
        }
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        resolve: {
          extensions: ['.tsx', '.ts', '.js']
        }
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'app/styles'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {importLoaders: 1},
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|ico)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
};
