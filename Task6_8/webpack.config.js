var webpack = require("webpack");
var path = require("path");
module.exports = {
    entry: "./index.js",
    output: {
        filename: "bundle.js"
    },
    module: {
        loaders: [   
	    {
		test: /\.js$/,
		exclude: /node_modules/,
		loader: 'babel',
		query: {
		    presets: ['es2015', 'stage-0']
		}
	    },
	    
	    /*{
		 test: /\.js$/, 
		 loader: "eslint-loader", 
		 exclude: /node_modules/
	    }*/
        ]
    },
    devtool: 'source-map'
};
