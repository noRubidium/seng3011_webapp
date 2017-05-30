var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: './index.js',
  devtool: debug ? "inline-sourcemap" : "nosources-source-map",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, "app"),
        // babelrc: false,
        query: {
          presets: ["es2015", "stage-0", "react"],
          plugins: [
            ["transform-object-rest-spread"],
            ["transform-react-display-name"],
            ["transform-decorators-legacy"],
          ],
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass') // loaders: ['style', 'css', 'sass']
      },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ],
  },
  plugins: debug ? [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'dist/styles/main.css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('debug'),
        API_URL: JSON.stringify('http://127.0.0.1:8000')
      }
    }),
  ] : [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        API_URL: JSON.stringify('http://api.kaiworship.xyz')
      }
    }),
    /* new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false,
      compress: {
        warnings: false,
        drop_console: true,
      }
    }),
    new ExtractTextPlugin({
      filename: 'dist/styles/main.css',
      allChunks: true,
    }) */
  ],
  resolve: {
    modules: [
      path.resolve('./app'),
      path.resolve('./node_modules')
    ]
  },
  devServer: {
    hotOnly: true,
    hot: true,
    inline:true,
    port: 8005
  },
};
