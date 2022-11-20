const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',

    entry: './src',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name].bundle.js"
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        // new FaviconsWebpackPlugin({
        //     logo: './favicon.ico', // svg works too!
        //     mode: 'webapp', // optional can be 'webapp', 'light' or 'auto' - 'auto' by default
        //     devMode: 'webapp', // optional can be 'webapp' or 'light' - 'light' by default 
        //     favicons: {
        //         appName: 'Weather App',
        //         appDescription: 'My awesome App',
        //         developerName: 'Me',
        //         developerURL: null, // prevent retrieving from the nearest package.json
        //         icons: {
        //             coast: false,
        //             yandex: false
        //         }
        //     }
        // })
    ],

    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: '/node_modules',
                use: ['babel-loader', 'ts-loader'],
                resolve: {
                    extensions: ['.tsx', '.ts', '.js'],
                },
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            {
                test: /\.(css)$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: {
                                localIdentName: "[name]__[local]__[hash:base64:5]"
                            }
                        }
                    },
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader',
                    options: {
                        esModule: true,
                        modules: {
                            namedExport: true,
                        }
                    },
                  },
                  {
                    loader: 'css-loader',
                    options: {
                        esModule: true,
                        modules: {
                            namedExport: true,
                            localIdentName: '[name]__[local]__[hash:base64:5]'
                        },
                        sourceMap: true
                    },
                  },
                  'postcss-loader', 'sass-loader']
            }
        ]
    },

    resolve: {
        // The following is only needed when running this boilerplate within the extjs-reactor repo with lerna bootstrap.  You can remove this from your own projects.
        alias: {
            "react-dom": path.resolve('./node_modules/react-dom'),
            "react": path.resolve('./node_modules/react')
        },
        extensions: [ ".ts", ".tsx", ".js", ".jsx", ".css", ".scss" ]
    },


    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './build'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
}