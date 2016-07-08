module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-webpack");
    grunt.initConfig({
        webpack: {
            build: {
              context: __dirname + '/js/modules/',
              entry: {
                authorization: "./authorization",
              },
              output: {
                  path: __dirname + '/public',
                  filename: "build.js",
                  library: "[name]"
              },

              module: {
                    loaders: [
                        { test: /\.css$/, loader: "style!css" },
                        { test: /\.html?$/, loader: 'html' }
                    ]
                }
            },
        }
    });
    grunt.registerTask("default", ["webpack:build"]);
};
