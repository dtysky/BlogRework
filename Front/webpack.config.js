/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var srcPath = path.join(__dirname, 'src');

module.exports = {
    cache: true,
    debug: true,
    entry: {
        main: [
            'webpack-dev-server/client?http://0.0.0.0:8000',
            'webpack/hot/only-dev-server',
            path.join(srcPath, 'index.js')
        ],
        velocity: [
            'webpack-dev-server/client?http://0.0.0.0:8000',
            'webpack/hot/only-dev-server',
            path.join(srcPath, 'require_velocity.js')
        ]
    }
    ,

    output: {
        filename: "[name].bundle.js",
        publicPath: '/assets/'
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
            'react-bootstrap',
            'jquery'
        ]
    },

    plugins: [
        new ExtractTextPlugin("main.css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $:'jquery'
        })
    ]
};
