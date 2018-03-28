const mode = process.env.NODE_ENV;
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const WebpackNotifierPlugin = require('webpack-notifier');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');
module.exports = {
    mode,
    entry: glob.sync('./src/js/*.js').reduce((entries, entry) => Object.assign(entries, { [entry.replace('./src/js/', '').replace('.js', '')]: entry }), {}),
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist/',
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader',
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                    },
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: mode !== 'development',
                        },
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer({ browsers: ['last 3 versions', 'IE > 9', 'Safari 9.1'] }),
                            ],
                        },
                    }, {
                        loader: 'sass-loader',
                    }],
                }),
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'file?name=[path][name].[ext]',
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file?name=[name].[ext]',
            },
        ],
    },
    watch: mode === 'development',
    plugins: [
        new ExtractTextPlugin('app.css'),
        new webpack.ProvidePlugin({
            _: 'underscore',
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
        new CssoWebpackPlugin({ sourceMap: true }),
        new UglifyJsPlugin({
            parallel: true,
            uglifyOptions: {
                output: {
                    beautify: true,
                    comments: false,
                },
                compress: {
                    sequences: true,
                    booleans: true,
                    loops: true,
                    unused: true,
                    warnings: false,
                    drop_console: true,
                    unsafe: true,
                },
            },
        }),
        new WebpackNotifierPlugin(),
    ],
    optimization: {
        minimize: mode === 'production',
        runtimeChunk: {
            name: 'vendor'
        },
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /node_modules/,
                    name: "vendor",
                    chunks: "initial",
                    minSize: 4
                }
            }
        },
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            vue: 'vue/dist/vue.js',
        },
    },

};
