const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackStringReplacePlugin = require ('html-webpack-string-replace-plugin') ;

module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname, './site/src/assets/'),
    entry: {
        common: ['./js/frame/GlobalPreset_DEV.js','./js/common.js'],
        basic: ['./js/basic.js'],
        home: ['./js/home.js']
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, './site/dist/kr/assets/'),
    },

    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: true,
                                minimize: false,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]?[hash]',
                        limit: 10000, //10kb
                        publicPath: '../',
                    }
                }
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]?[hash]',
                        publicPath: '../',
                    }
                }
            },
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
        new CopyWebpackPlugin(
            [
                {from:"../data_tmp/**/*", to:"../"},
                {from:"../index.html", to:"../"},
                {from:"../markup_template/**/*.html"}
            ]
        ),
        new ExtractTextPlugin({
            filename:  function(getPath){
                return getPath('css/[name].css');
            },
            allChunks: true
        }),

        //HTML Template
        new HtmlWebpackPlugin({
            filename: '../404.html',
            template: '../404.html',
            inject: false,
        }),
        new HtmlWebpackPlugin({
            filename: '../500.html',
            template: '../500.html',
            inject: false,
        }),

        new HtmlWebpackStringReplacePlugin({
            __LANG__:'ko',
            __404_message_title__:`요청하신 페이지를<br class="_m">찾을 수 없습니다. `,
            __404_message_desc__:`<p>방문하시려는 페이지의 주소가 잘못 입력되었거나<br>
                                   주소의 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.</p>
                                <p>입력하신 주소가 정확한지 다시 한번 확인해주시기 바랍니다.<br>
                                   감사합니다.</p>`,
        })
    ],
};