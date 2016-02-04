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

module.exports = {
    cache: true,
    debug: true,
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8000',
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],

    output: {
        filename: "bundle.js",
        publicPath: '/assets/'
    },

    stats: {
        colors: true,
        reasons: true,
        errorDetails: true
    },

    devtool: false,

    resolve: {
        root:[path.join(__dirname)],
        extensions: ['' , '.js'],
        alias: {
            'styles': __dirname + '/theme/style',
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
                loaders: ['react-hot','babel'],
                include : path.join(__dirname, 'src')
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
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&minetype=application/octet-stream"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&minetype=image/svg+xml"
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json",["main"]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery: 'jquery',
            "window.jQuery": "jquery",
            "root.jQuery": "jquery"
        })
    ]

};
