/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

    
module.exports = {

    output: {
        publicPath: '/assets/',
        path: 'dist/assets/',
        filename: 'index.js'
    },

    debug: false,
    entry: 'index.tsx',

    stats: {
        colors: true,
        reasons: true
    },

    devtool: 'source-map',

    resolve: {
      root:[path.join(__dirname,"bower_components")],
      extensions: ['.ts', '.js', '.tsx'],
      alias: {
          'styles': __dirname + '/src/styles',
          'lib': __dirname + '/src/lib'
      }
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
                loaders:['react-hot','babel'],
                include : path.join(__dirname,'src')
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.(png|jpg|gif|woff|woff2)$/,
                loader: 'url-loader?limit=10'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml"
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json",["main"]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]

};