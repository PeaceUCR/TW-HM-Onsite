/**
 * Created by hea on 3/21/19.
 */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpack = require('webpack');

let ENV = process.env.npm_lifecycle_event;
let isTest = ENV === 'test' || ENV === 'test-watch';

const config = {

    entry: isTest ? null: ['babel-polyfill', path.resolve(__dirname,'./src/app.js')],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {

                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: isTest ? 'null-loader': [ 'style-loader', MiniCssExtractPlugin.loader , 'css-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: isTest ? 'null-loader': ['style-loader', MiniCssExtractPlugin.loader ,'css-loader', 'less-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.html$/,

                exclude: path.resolve(__dirname, './src/index.html'),
                use: [
                    { loader:'ngtemplate-loader?relativeTo=' + (path.resolve(__dirname, './src')) },
                    { loader: 'html-loader' }
                ]
            }

        ]
    },
    devServer: {
        contentBase: './build',
        compress: true
    },
    plugins: [
    ],
    mode: 'development',
    devtool: isTest ? 'inline-source-map' : 'source-map',
    cache: true,
    performance:{
        hints: false
    }
};

// ISTANBUL LOADER
// https://github.com/deepsweet/istanbul-instrumenter-loader
// Instrument JS files with istanbul-lib-instrument for subsequent code coverage reporting
// Skips node_modules and files that end with .spec.js
if (isTest) {
    config.module.rules.push({
        enforce: 'pre',
        test: /\.js$/,
        exclude: [
            /node_modules/,
            /\.spec\.js$/
        ],
        loader: 'istanbul-instrumenter-loader',
        query: {
            esModules: true
        }
    })
}

if (!isTest) {

    config.plugins.push(
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname,'./build/index.html'),
            template: path.resolve(__dirname,'./src/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    )
}

module.exports = config;