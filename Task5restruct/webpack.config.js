var NODE_ENV = process.env.NODE_ENV ||'development';
var webpack = require('webpack');
var path = require("path");

module.exports = {
    entry: "./src/app.js",
    output: {
        path: __dirname + '/backend/client',
        filename: "bundle.js"
    },
    watch: NODE_ENV == 'development',
    watchOptions: {
      aggregateTimeout: 100
    },
    resolve: {
      modulesDirectories: ['node_modules'],
      extensions: ['', '.js']
    },
    resolveLoader: {
      modulesDirectories: ['node_modules'],
      moduleTemplates: ['*-loader','*'],
      extensions: ['', '.js']
    },

    plugins: [
       new webpack.DefinePlugin({
         NODE_ENV: JSON.stringify(NODE_ENV)
       })
    ],

    module: {
          loaders: [
              { test: /\.css$/, loader: "style!css" },
              { test: /\.html?$/, loader: 'html' },
              { test: /\.ejs$/, loader: 'ejs-loader'}
          ]
      }
};

if (NODE_ENV == "production") {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  );
}
