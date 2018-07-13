const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const mode = process.env.NODE_ENV || 'development';
const CopyWebpackPlugin = require('copy-webpack-plugin');

var plugins = [
    new UglifyJsPlugin({
      include: /\.js($|\?)/i
    }),
    new UnminifiedWebpackPlugin(),
];


module.exports = (env, argv) => {
    let production = argv.mode === 'production'
    if (!production) {
        plugins.push (new CopyWebpackPlugin([
          {
            from: 'ressources/testIframe.html',
            to: 'testIframe.html',
          }, {
            from: 'test/*Index*',
            to: 'index.html',
          }
        ]))
    };

    return correctConfig
};

correctConfig = {
  entry: './src/index.js',
  watch: false,  //put to true if you want to debug 
  watchOptions: {
    ignored: /node_modules/
  },
  devtool: (mode === 'development') ? 'inline-source-map' : false,
  mode: mode,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          emitWarning: true,
        }
      }
    ]
  },
  output: {
    filename: 'prebidSkin.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
  contentBase: path.join(__dirname, 'dist'),
  watchContentBase: true,
  compress: true,
  port: 9000
  },
  plugins: plugins
};
