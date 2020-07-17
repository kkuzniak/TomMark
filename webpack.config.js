const path = require('path');
const HTMLWebpackPLugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/js/app.js', './src/scss/app.scss'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HTMLWebpackPLugin({
            filename: 'index.html',
            template: './src/index.html',
            minify: false
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].css'
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader?-url'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    }
}