const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        popup: path.resolve('./src/popup/popup.tsx'),
        options: path.resolve('./src/options/options.tsx'),
        background: path.resolve('./src/background/background.ts'),
        contentScript: path.resolve('./src/contentScript/contentScript.ts'),
        about: path.resolve('./src/about/about.tsx'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            indent: 'postcss',
                            plugins: [
                                tailwindcss,
                                autoprefixer,
                            ],
                        },
                    },
                }],
            },
            {
                type: 'assets/resource',
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: 'asset/resource',
            }
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: path.resolve('src/static'), to: path.resolve('dist') },
            ],
        }),
        // new HtmlPlugin({
        //     title: 'Chrome Extension',
        //     filename: 'popup.html',
        //     chunks: ['popup'],
        // }),
        ...getHtmlPlugins([
            'popup',
            'options',
            'about',
        ]),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    output: {
        filename: '[name].js', 
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
}

function getHtmlPlugins(chunks) {
    return chunks.map(name => {
        return new HtmlPlugin({
            title: 'Chrome Extension',
            filename: `${name}.html`,
            chunks: [name],
        });
    });
}