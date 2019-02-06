const CleanPlugin = require('clean-webpack-plugin');

const path = require('path');
const commonConfig = require('./common.config');
const config = commonConfig.config;
const constants = commonConfig.constants;

const prdConfig = {
    ...config,
    output: {
        path: path.resolve(constants.DIST_PATH, 'js'),
        filename: '[name].[hash:8].js'
    },

};

prdConfig.plugins = prdConfig.plugins.unshift(
    new CleanPlugin([
        'md',
    ],{
        root: constants.ROOT_PATH, //指定根目录
    })
);

module.exports = prdConfig;