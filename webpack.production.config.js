const path = require('path');
const HTMLWebpackPLugin = require('html-webpack-plugin');
const HTMLReplaceWebpackPLugin = require('html-replace-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'landing': ['./src/js/landing.js', './src/scss/pages/landing.scss'],
        'about': ['./src/scss/pages/about.scss'],
        'contact': ['./src/js/contact.js', './src/scss/pages/contact.scss'],
        'work': ['./src/js/work.js'],
        'weronikaSurdacka': ['./src/scss/works/weronikaSurdacka.scss'],
        'royalStar': ['./src/scss/works/royalStar.scss'],
        'frontlineClub': ['./src/scss/works/frontlineClub.scss'],
        'pinaColada': ['./src/scss/works/pinaColada.scss']
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
            minify: true,
            chunks: ['landing'],
            inject: false
        }),
        new HTMLWebpackPLugin({
            filename: 'landing_2.html',
            template: './src/landing_2.html',
            minify: true,
            chunks: ['landing'],
            inject: false
        }),
        new HTMLWebpackPLugin({
            filename: 'landing_3.html',
            template: './src/landing_3.html',
            minify: true,
            chunks: ['landing'],
            inject: false
        }),
        new HTMLWebpackPLugin({
            filename: 'landing_4.html',
            template: './src/landing_4.html',
            minify: true,
            chunks: ['landing'],
            inject: false
        }),
        new HTMLWebpackPLugin({
            filename: 'about.html',
            template: './src/about.html',
            minify: true,
            chunks: ['about'],
            inject: false
        }),
        new HTMLWebpackPLugin({
            filename: 'contact.html',
            template: './src/contact.html',
            minify: true,
            chunks: ['contact'],
            inject: false
        }),
        new HTMLWebpackPLugin({
            filename: 'weronika_surdacka.html',
            template: './src/weronika_surdacka.html',
            minify: true,
            chunks: ['weronikaSurdacka', 'work'],
            inject: false
        }),
        new HTMLWebpackPLugin({
            filename: 'royal_star.html',
            template: './src/royal_star.html',
            minify: true,
            chunks: ['royalStar', 'work'],
            inject: false
        }),
        new HTMLWebpackPLugin({
            filename: 'frontline_club.html',
            template: './src/frontline_club.html',
            minify: true,
            chunks: ['frontlineClub', 'work'],
            inject: false
        }),
        new HTMLWebpackPLugin({
            filename: 'pina_colada.html',
            template: './src/pina_colada.html',
            minify: true,
            chunks: ['pinaColada', 'work'],
            inject: false
        }),
        new HTMLReplaceWebpackPLugin([
            {pattern: 'index.html', replacement: 'work/weronika-surdacka'},
            {pattern: 'landing_2.html', replacement: 'work/royal-star'},
            {pattern: 'landing_3.html', replacement: 'work/frontline-club'},
            {pattern: 'landing_4.html', replacement: 'work/pina-colada'},
            {pattern: 'contact.html', replacement: 'contact'},
            {pattern: 'about.html', replacement: 'about'},
            {pattern: 'weronika_surdacka.html', replacement: 'work/weronika-surdacka/preview'},
            {pattern: 'royal_star.html', replacement: 'work/royal-star/preview'},
            {pattern: 'frontline_club.html', replacement: 'work/frontline-club/preview'},
            {pattern: 'pina_colada.html', replacement: 'work/pina-colada/preview'}
        ]),
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
                },
                {
                    from : './src/.htaccess', to: './'
                },
                {
                    from: './src/sendMail.php', to: './'
                },
                {
                    from: './src/phpmailer', to: './phpmailer'
                }
            ]
        }),
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
                    // {
                    //     loader: 'postcss-loader'
                    // },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    }
}