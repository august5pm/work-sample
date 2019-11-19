const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackStringReplacePlugin = require ('html-webpack-string-replace-plugin') ;

const domainMain = "";

module.exports = {
    devtool: 'inline-source-map',
    context: path.resolve(__dirname,'./site/src/assets/'),
    entry: {
        common: ['./js/frame/GlobalPreset_DEV.js','./js/common.js'],
        contents: ['./js/contents.js']
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname,'./site/dist/dev/assets')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use:[
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                                // the "scss" and "sass" values for the lang attribute to the right configs here.
                                // other preprocessors should work out of the box, no loader config like this necessary.
                                'scss': 'vue-style-loader!css-loader!sass-loader',
                                'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'

                            }
                            // other vue-loader options go here
                        }
                    }
                ]

            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:[
                    {
                        loader:'babel-loader',
                        options: {
                            presets: [[
                                'env', {
                                    targets: {
                                        browsers: ['last 3 versions']
                                    }
                                }
                            ]],
                        }
                    }
                ]
            },
            {
                test: /detectizr\.js$/,
                use:[
                    "imports-loader?this=>window",
                    "exports-loader?window.Detectizr"
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    plugins: [
       /* new CleanWebpackPlugin(['./site/dist/dev']),*/
        new CopyWebpackPlugin(
            [
                {from:'../assets/css/*'},
                {from:'../assets/images/**/*'},
                {from:'../assets/fonts/*'},
                {from:'../data_tmp/**/*'},
                {from:'../download/*'},
                {from:'../markup_tmp/*.html'},
                {from:'../assets/3d/*'}
            ]
        ),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: '../index.html',
            inject: false,
        }),

        new HtmlWebpackStringReplacePlugin({
            __DOMAIN__: domainMain,
            __LANG__: 'kr',
            __TITLE_COMMON__:'AUGUST',

            __SEO_SITE_NAME__:'Official Website',
            __SEO_AUTHOR__:'AUGUST',
            __SEO_DESC__:'페이지 설명 값',
            __SEO_KEYWORD__:'페이지 키워드 값',
            __APP_TITLE__:'페이지 제목 값 | 홈화면에 추가시 보이는 타이틀',

            __VER__:new Date().getTime()
        })
    ]
}
