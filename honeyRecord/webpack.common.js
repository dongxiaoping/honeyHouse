// +----------------------------------------------------------------------
// | Copyright (js), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2017/9/14
// +----------------------------------------------------------------------
// | Description: 公共的运行脚本
// +----------------------------------------------------------------------

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    //分内置插件和外置插件
    plugins: [
        new CleanWebpackPlugin(['dist']),//每次构建前清理dist目录
        new HtmlWebpackPlugin({ //发布加载html文件
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        // module.rules 是最关键的一块配置。它告知 webpack每一种文件都需要使用什么加载器来处理：
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [ {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }],
            }
        ]
    },
    //其它解决方案配置
    resolve: {}
};