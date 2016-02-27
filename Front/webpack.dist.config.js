/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var srcPath = path.join(__dirname, 'src');
    
module.exports = {

    output: {
        publicPath: '/assets/',
        path: 'dist/assets/',
        filename: 'bundle.js'
    },

    debug: false,
    entry: 'index.js',

    stats: {
        colors: true,
        reasons: true
    },

    devtool: false,

    resolve: {
        root: [srcPath],
        extensions: ["", ".webpack.js", ".web.js", ".js"],
        alias: {
            config: "config.js"
        }
    },

    target: "web",

    node:{
        fs: "empty"
    },

    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: [/node_modules/,/bower_components/,/extra/],
            loader: 'jsxhint'
        }],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['react-hot','babel'],
                include : srcPath
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
            'jquery'
        ]
    },

    plugins: [
        new ExtractTextPlugin("main.css"),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.ProvidePlugin({
            $:'jquery'
        })
    ]
};