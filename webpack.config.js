/* eslint-disable */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:  __dirname + '/app/main.js',

    devServer: {
        contentBase: __dirname + '/app',
        colors: true,
        historyApiFallback: true,
        inline: true,
        host: '0.0.0.0',
        port: 8000,
        disableHostCheck: true
    },

    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
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
                test: /\.(jpg|png|gif|eot|otf|svg|ttf|woff)$/,
                loader: 'url?limit=25000'
            }
        ]
    },

    externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
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
            template: __dirname + '/app/index.tmpl.html',
        }),
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.desktop.tmpl.html',
            filename: 'index.desktop.html',
        }),
    ],

    output: {
        path: __dirname,
        filename: '/bundle.js'
    },

    devtool: 'eval-source-map'
}

if (process.env.ANALYZER) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

    module.exports.plugins.push(new BundleAnalyzerPlugin());
}
