const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, './site/src/assets/'),
    entry: {
        common: ['./js/frame/GlobalPreset_PROD_KR.js','./js/common.js'],
        basic: ['./js/basic.js'],
        home: ['./js/home.js']
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, './site/dist/kr/assets'),
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
                        name: '[path][name].[ext]?[hash]',
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
                {from:"../index.html", to:"../"}
            ]
        ),
        new ExtractTextPlugin({
            filename:  function(getPath){
                return getPath('css/[name].css');
            },
            allChunks: true
        }),
    ]
};