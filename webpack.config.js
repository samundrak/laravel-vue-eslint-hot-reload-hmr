const webpack = require('webpack');
var path = require('path');
const home = path.join(__dirname, 'resources/assets/js');
const build = path.join(__dirname, './public');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

module.exports = {
    entry: {
        main: [
            path.resolve(home, 'app.js'),
            hotMiddlewareScript
        ]
    },
    output: {
        publicPath: '/script',
        path: '/',
        filename: '[name].build.js'
    },
    inline: true,
    devtool: '#eval-source-map',
    module: {
        loaders: [
            {
                enforce: 'pre',
                test: /\.(js|vue)?$/,
                loaders: ['eslint'],
                include: home,
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: /(resources\/assets\/js)/,
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=40000'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!sass-loader',
            },
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    vue: {
        loaders: {
            js: 'babel'
        }
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue': 'vue/dist/vue.js',
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime', 'add-module-exports']
    },
    eslint: {
        configFile: './.eslintrc.yml',  //your .eslintrc file
        emitWarning: true,
    }
};