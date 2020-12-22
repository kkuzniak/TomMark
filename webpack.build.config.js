const path = require('path');
const HTMLWebpackPLugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'landing': ['./src/js/landing.js', './src/scss/pages/landing.scss'],
        'work': ['./src/js/work.js', './src/scss/pages/work.scss'],
        'about': ['./src/js/about.js', './src/scss/pages/about.scss'],
        'contact': ['./src/js/contact.js', './src/scss/pages/contact.scss'],
        'workPreview': ['./src/js/workPreview.js'],
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
            filename: 'work_1.html',
            template: './src/work_1.html',
            minify: true,
            chunks: ['work'],
            inject: false
        }),
        new HTMLWebpackPLugin({
            filename: 'work_2.html',
            template: './src/work_2.html',
            minify: true,
            chunks: ['work'],
            inject: false
        }),
        new HTMLWebpackPLugin({
            filename: 'work_3.html',
            template: './src/work_3.html',
            minify: true,
            chunks: ['work'],
            inject: false
        }),
        new HTMLWebpackPLugin({
            filename: 'work_4.html',
            template: './src/work_4.html',
            minify: true,
            chunks: ['work'],
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