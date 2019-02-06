const path = require('path');
const commonConfig = require('./common.config');
const config = commonConfig.config;
const constants = commonConfig.constants;

module.exports = {
    ...config,
    output: {
        publicPath: '/md/',
        path: path.resolve(constants.DIST_PATH, 'js'),
        filename: '[name].[hash:8].js'
    },
    devServer: {
        hot: true,
        inline: true,
        historyApiFallback: false,
        disableHostCheck: true,
    },
};