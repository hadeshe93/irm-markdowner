const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('[name]_css.[hash:8].css');
const extractLESS = new ExtractTextPlugin('[name]_less.[hash:8].css');
const SwRegisterWebpackPlugin = require('sw-register-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, '../');
const SRC_PATH = path.resolve(ROOT_PATH, './src');
const DIST_PATH = path.resolve(ROOT_PATH, './md');
const ASSETS_PATH = path.resolve(SRC_PATH, './assets');
const VIEWS_PATH = path.resolve(SRC_PATH, './views');
const COMPONENTS_PATH = path.resolve(SRC_PATH, './components');

const CODE_THEMES = fs.readdirSync(path.resolve(ASSETS_PATH, 'style/themes/'));

const commonConfig = {
    //页面入口文件配置
    entry: {
        responsive: path.resolve(ASSETS_PATH, 'scripts/responsive.js'),
        index: path.resolve(SRC_PATH, 'index.js'),
    },
    resolve: {
        extensions: ['*', '.vue', '.js'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'axios': 'axios/dist/axios.min.js',

            '@SRC': SRC_PATH,
            '@ASSETS': ASSETS_PATH,
            '@VIEWS': VIEWS_PATH,
            '@COMPONENTS': COMPONENTS_PATH,
        }
    },
    module: {
        //加载器配置
        loaders: [{
                test: /\.css$/,
                use: extractCSS.extract(['css-loader']),
            },
            {
                test: /\.less$/,
                use: extractLESS.extract(['css-loader', 'less-loader?sourceMap']),
            },
            {
                test: /\.styl$/,
                use: extractLESS.extract(['css-loader', 'stylus-loader?sourceMap']),
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: 'babel-loader',
                // include: SRC_PATH,
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            'css': ['style-loader', 'css-loader'],
                            'less': ['style-loader', 'css-loader', 'less-loader?sourceMap'],
                            'stylus': ['style-loader', 'css-loader', 'stylus-loader?sourceMap'],
                        }
                    }
                }]
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            WPP_CODE_THEMES: JSON.stringify(CODE_THEMES),
        }),
        // 生成页面插件
        new HtmlWebpackPlugin({
            filename: 'index.html', //默认目录路径为output.publicPath
            template: './src/index.html', //默认目录路径为根目录
            inject: true,
        }),
        extractCSS,
        extractLESS,
        new CopyWebpackPlugin([{
                context: path.resolve(ASSETS_PATH, 'style/pageThemes'),
                from: '*',
                to: './pageThemes', // to的默认路径为output.publicPath
                force: true
            },
            {
                context: path.resolve(ASSETS_PATH, 'imgs'),
                from: '*',
                to: './imgs',
                force: true
            },
            {
                context: path.resolve(ASSETS_PATH, 'style/themes'),
                from: '*',
                to: './themes',
                force: true
            },
            {
                context: SRC_PATH,
                from: "demo.md",
                to: './demo.md',
                force: true
            },
            {
                context: SRC_PATH,
                from: "favicon.ico",
                to: './favicon.ico',
                force: true
            },
            {
                from: path.resolve(ROOT_PATH, 'service-worker-plugin.js'),
                to: DIST_PATH
            },
        ]),
        // service worker
        new SwRegisterWebpackPlugin({
            // 各种 option 参数
            // prefix: '/'
            filePath: path.resolve(ROOT_PATH, 'sw-register.js'),
        }),
        new SWPrecacheWebpackPlugin(
            {
              cacheId: 'app-cache',
              // 生成的文件名称
              filename: 'service-worker.js',
              // 需缓存的文件配置, 可以逐项添加, 需动态缓存的放到runtimeCaching中处理
              staticFileGlobs: [
                // 'dist/index.html',
                // 'dist/static/**/**.*'
              ],
              // webpack生成的静态资源全部缓存
              mergeStaticsConfig: true,
              // 忽略的文件
              staticFileGlobsIgnorePatterns: [
                /\.map$/ // map文件不需要缓存
              ],
              // 是否压缩，默认不压缩
              minify: true,
              importScripts: [
                'service-worker-plugin.js'
              ],
              verbose: true,
              runtimeCaching: [
                {
                    urlPattern: /demo\.md/,
                    handler: 'networkFirst'
                },
              ]
               // 当请求路径不在缓存里的返回，对于单页应用来说，入口点是一样的
              //  navigateFallback: path.resolve(CONSTANTS.DIST_PATH, 'index.html'),
              // 白名单包含所有的.html (for HTML imports) 和路径中含 `/data/`
              // navigateFallbackWhitelist: [/^(?!.*\.html$|\/data\/).*/],
              
            }
        ),
    ]
};

module.exports = {
    config: commonConfig,
    constants: {
        ROOT_PATH,
        SRC_PATH,
        DIST_PATH,
        ASSETS_PATH,
        VIEWS_PATH,
        COMPONENTS_PATH,

        CODE_THEMES,
    },
};