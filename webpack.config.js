const path = require('path');
const HTMLWebpackPLugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;  

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
        }),
        new HTMLWebpackPLugin({
            filename: 'about.html',
            template: './src/about.html',
            minify: false,
            inject: false
        }),
        new CopyPlugin({ 
            patterns: [
                {
                    from: './src/fonts', to: './fonts'
                },
                {
                    from: './src/images', to: './images'
                },
                {
                    from: './src/icons', to: './icons'
                },
                {
                    from: './src/videos', to: './videos'
                }
            ]
        }),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i
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