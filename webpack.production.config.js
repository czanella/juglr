var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:  __dirname + '/app/main.js',

    output: {
        path: __dirname + '/build',
        filename: '/[name]-[hash].js'
    },

    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'env', 'stage-0'],
                }
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css!less')
            },
            {
                test: /\.(jpg|png|gif|eot|otf|svg|ttf|woff)$/,
                loader: 'url?limit=25000'
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
            Promise: 'imports?this=>global!exports?global.Promise!es6-promise'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"' + process.env.NODE_ENV + '"'
            }
        }),
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'
        }),
        new CopyWebpackPlugin([{
            from: __dirname + '/app/static',
            to: __dirname + '/build/static'
        }]),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('/[name]-[hash].css')
    ],

    devtool: 'source-map'
}
