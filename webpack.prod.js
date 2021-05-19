const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    plugins: [
        new miniCssExtractPlugin({ filename: "[name].[contenthash].css" })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [miniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    }
});