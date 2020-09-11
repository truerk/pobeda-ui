const fs = require("fs");
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets',
    bundles: 'bundles'
}

const PAGES_DIR = `${PATHS.src}/template/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith(".html"));

module.exports = {
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: `${PATHS.src}/${PATHS.assets}`, to: `${PATHS.assets}/` },
                { from: `${PATHS.src}/static/`, to: '' }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: `${PATHS.bundles}/css/[name].css`,
            chunkFilename: "[id].css"
        }),
        ...PAGES.map(
            page =>
                new HtmlWebpackPlugin({
                    title: 'app',
                    template: `${PAGES_DIR}/${page}`,
                    filename: `./${page}`,
                    inject: false,
                    chunks: 'all',
                    minify  : true,
                    hash: false,
                })
        )
    ],
    optimization: {
        minimize: true
    },
    entry: {
        "index": [
            `${PATHS.src}/js/index.js`,
            `${PATHS.src}/scss/index.js`,
        ],
    },
    output: {
        path: PATHS.dist,
        filename: `${PATHS.bundles}/js/[name].js`,
        publicPath: "/"
    },
    devServer: {
        contentBase: path.join(__dirname, './'),
        overlay: true
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@ui': path.resolve(__dirname, '../src/ui/js'),
            '@scss': path.resolve(__dirname, '../src/ui/scss'),
            '@utils': path.resolve(__dirname, '../src/ui/utils'),
        }
    },
    module: {
        rules: [
            {
                test: /\.module\.(sa|sc|c)ss$/,
                exclude: /(node_modules)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: {
                                getLocalIdent: getCSSModuleLocalIdent,
                            },
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: { path: path.join(__dirname, './postcss.config.js') }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    },
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: [/(node_modules)/, /\.module\.(sa|sc|c)ss$/],
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true, }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: { path: path.join(__dirname, './postcss.config.js') }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    },
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.m?jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/react'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
        ]
    },
};
