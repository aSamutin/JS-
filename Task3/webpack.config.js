var NODE_ENV = process.env.NODE_ENV ||'development';
var webpack = require('webpack');
module.exports = {
    context: __dirname + '/js/modules/',
    entry: {
      authorization: "./authorization",
    },
    output: {
        path: __dirname + '/public',
        filename: "build.js",
        library: "[name]"
    },
    watch: NODE_ENV == 'development',
    watchOptions: {
      aggregateTimeout: 100
    },

    plugins: [
       new webpack.DefinePlugin({
         NODE_ENV: JSON.stringify(NODE_ENV)
       })
    ],

    module: {
          loaders: [
              { test: /\.css$/, loader: "style!css" },
              { test: /\.html?$/, loader: 'html' }
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
