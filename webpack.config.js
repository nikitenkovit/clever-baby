const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const Paths = {
    SRC: path.join(__dirname, 'src'),
    DIST: path.join(__dirname, 'dist'),
};

const PAGES_DIR = `${Paths.SRC}`;
const PAGES = fs.readdirSync(PAGES_DIR).filter((filename) => filename.endsWith('.html'));

module.exports = {
    target: "browserslist",
    // target: "web",
    entry: {
        app: Paths.SRC,
    },
    output: {
        filename: "main.js",
        path: Paths.DIST
    },
    devServer: {
        contentBase: Paths.DIST,
        open: false,
        port: 1337,
        compress: true,
    },

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                loader: 'file-loader',
                options: {
                    name: '/[folder]/[name].[ext]'
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {publicPath: ""}
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: (url) => {
                                if (url.includes('.png') || url.includes('.jpg') || url.includes('.svg')
                                    || url.includes('.gif')) {
                                    return false;
                                }

                                return true;
                            },
                        },
                    },
                    "postcss-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        ...PAGES.map((page) => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page}`,
            scriptLoading: "blocking"
        })),
        new CopyWebpackPlugin({
            patterns: [
                { from: `${Paths.SRC}/images`, to: `${Paths.DIST}/images` },
                { from: `${Paths.SRC}/video`, to: `${Paths.DIST}/video` }
            ],
        }),
    ],
    resolve: {
        extensions: [".js", ".jsx"]
    },

    // devtool: "source-map",
};
