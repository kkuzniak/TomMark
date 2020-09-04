const path = require('path');
const HTMLWebpackPLugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;  

module.exports = {
    entry: {
        'landing': ['./src/js/app.js', './src/js/landing.js', './src/scss/pages/landing.scss'],
        'about': ['./src/scss/pages/about.scss'],
        'contact': ['./src/js/contact.js', './src/scss/pages/contact.scss'],
        'weronikaSurdacka': ['./src/js/weronikaSurdacka.js', './src/scss/works/weronikaSurdacka.scss'],
        'royalStar': ['./src/js/royalStar.js', './src/scss/works/royalStar.scss'],
        'frontlineClub': ['./src/js/frontlineClub.js', './src/scss/works/frontlineClub.scss'],
        'pinaColada': ['./src/js/pinaColada.js', './src/scss/works/pinaColada.scss']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new HTMLWebpackPLugin({
            filename: 'index.html',
            template: './src/index.html',
            // minify: false,
            chunks: ['landing'],
        }),
        new HTMLWebpackPLugin({
            filename: 'about.html',
            template: './src/about.html',
            minify: false,
            chunks: ['about'],
        }),
        new HTMLWebpackPLugin({
            filename: 'contact.html',
            template: './src/contact.html',
            minify: false,
            chunks: ['contact'],
        }),
        new HTMLWebpackPLugin({
            filename: 'weronika_surdacka.html',
            template: './src/weronika_surdacka.html',
            minify: false,
            chunks: ['weronikaSurdacka'],
        }),
        new HTMLWebpackPLugin({
            filename: 'royal_star.html',
            template: './src/royal_star.html',
            minify: false,
            chunks: ['royalStar'],
        }),
        new HTMLWebpackPLugin({
            filename: 'frontline_club.html',
            template: './src/frontline_club.html',
            minify: false,
            chunks: ['frontlineClub'],
        }),
        new HTMLWebpackPLugin({
            filename: 'pina_colada.html',
            template: './src/pina_colada.html',
            minify: false,
            chunks: ['pinaColada'],
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
                },
                {
                    from: './src/favicon', to: './favicon'
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