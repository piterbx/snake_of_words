const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [new htmlWebpackPlugin({
        template: './src/template.html'
    })]
};