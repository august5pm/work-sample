const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackStringReplacePlugin = require ('html-webpack-string-replace-plugin') ;

const domainMain = "http://august.co.kr";

module.exports = {
    context: path.resolve(__dirname, './site/src/assets/'),
    entry: {
        common: ['./js/frame/GlobalPreset_PRODUCT.js','./js/common.js'],
        contents: ['./js/contents.js']
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, './site/dist/august/assets'),
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
                                minimize: true,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                        },
                        {
                            loader: 'sass-loader',
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[path][name].[ext]?[hash]',
                        limit: 1000, //1kb
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
                            ]]
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
        new CleanWebpackPlugin(['./site/dist/august']),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                screw_ie8: true,
                keep_fnames: true,
                except: ['$super', '$', 'exports', 'require']
            },
            beautify: false,
            comments: false,

            debug:false,
            sourceMap:false,
            compress: true,
            compress: {
                // remove warnings
                warnings: false,

                // Drop console statements
                drop_console: true,
                drop_debugger: true

            }
        }),

        new CopyWebpackPlugin(
            [
                {from:"../browserconfig.xml", to:'../'},
                {from:"../crossdomain.xml", to:'../'},
                {from:"../robots.txt", to:'../'},
                {from:"../favicon/*"},
                {from:'../assets/css/*'},
                {from:'../assets/images/**/*'},
                {from:'../assets/fonts/*'},
                {from:'../download/*'},
                {from:'../assets/3d/*'}
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
            filename: '../index.html',
            template: '../index.html',
            inject: false,
        }),

        new HtmlWebpackStringReplacePlugin({
            __DOMAIN__: domainMain,
            __LANG__: 'kr',
            __TITLE_COMMON__:'AUGUST ',


            __SEO_SITE_NAME__:'Official Website',
            __SEO_AUTHOR__:'AUGUST',
            __SEO_DESC__:'페이지 설명 값',
            __SEO_KEYWORD__:'페이지 키워드 값',
            __APP_TITLE__:'페이지 제목 값 | 홈화면에 추가시 보이는 타이틀',
            __VER__:new Date().getTime()
        })
    ],
};
