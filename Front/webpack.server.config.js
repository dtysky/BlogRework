/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');
var fs = require('fs');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var srcPath = path.join(__dirname, 'src');

module.exports = {
    cache: true,
    debug: true,
    entry: path.join(srcPath, 'server.js'),

    output: {
        publicPath: '/',
        path: 'dist/tmp/',
        filename: 'server.js'
    },

    stats: {
        colors: true,
        reasons: true,
        errorDetails: true
    },

    devtool: false,

    resolve: {
        root: [srcPath],
        extensions: ["", ".webpack.js", ".web.js", ".js"],
        alias: {
            config: "config.js"
        }
    },

    // keep node_module paths out of the bundle
    externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
        'react-dom/server'
    ]).reduce(function (ext, mod) {
        ext[mod] = 'commonjs ' + mod;
        return ext
    }, {}),

    target: "node",

    node: {
        __filename: true,
        __dirname: true
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, path.join(srcPath, "config.js")],
                loader: 'babel-loader?presets[]=es2015&presets[]=react'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.(png|jpg|gif|woff|woff2)$/,
                loader: 'url?limit=10'
            },
            {
                test   : /\.woff|\.woff2|\.svg|.eot|\.ttf/,
                loader : 'url?prefix=font/&limit=10000'
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ],
        noParse:[
            'react-bootstrap',
            'jquery'
        ]
    },

    plugins: [
        new ExtractTextPlugin("main.css"),
        //new webpack.optimize.DedupePlugin(),
        //new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.ProvidePlugin({
            $:'jquery'
        })
    ]
};
