const CleanPlugin = require('clean-webpack-plugin');

const webpack = require('webpack');
const commonConfig = require('./common.config');
const config = commonConfig.config;
const constants = commonConfig.constants;

const prdConfig = {
    ...config,
    output: {
        // path: path.resolve(constants.DIST_PATH, 'js'),
        path: constants.DIST_PATH,
        filename: '[name].[hash:8].js'
    },

};

prdConfig.plugins.unshift(
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CleanPlugin([
        'md',
    ],{
        root: constants.ROOT_PATH, //指定根目录
    })
);


module.exports = prdConfig;