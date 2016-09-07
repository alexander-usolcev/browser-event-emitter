'use strict';

const NODE_ENV = process.env.NODE_ENV || 'production';
const webpack = require('webpack');
const path = require('path');


module.exports = {
    context: path.join(__dirname, "test"),

    entry: {
        'my-bundle': ['./my-file']
    },

    output: {
        path: path.join(__dirname, "test"),
        filename: '[name].min.js'
    },

    plugins: [
        new webpack.NoErrorsPlugin()
    ],

    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        extensions:         ['', '.js']
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates:    ['*-loader', '*'],
        extensions:         ['', '.js']
    },


    module: {
        loaders: [
            {
                test:   /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            }
        ],

        noParse: [/bower_components/]
    }
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // don't show unreachable variables etc
                warnings:     false,
                // drop_console: true
                //unused:       false
                //unsafe:       true

            }
        })
    );
}