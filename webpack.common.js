const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    plugins: [new htmlWebpackPlugin({
        template: './src/template.html'
    })]
};