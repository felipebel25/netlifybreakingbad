
const path = require("path");
const HtmlWebpackplugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports= {
    entry: './src/index.js',
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: "[name][contenthash].js",
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode:"development",
    devtool:'source-map',
   
    resolve:{
        //aca va los frameworks ejemplo svelte react
        extensions: ['.js'],
        alias:{
            '@utils': path.resolve(__dirname, "src/utils/"),
            '@templates': path.resolve(__dirname, "src/templates/"),
            '@styles': path.resolve(__dirname, "src/styles/"),
            '@images': path.resolve(__dirname, "src/assets/images/")


        }
    },
    module:{
        rules:[
        {

            //utiliza cualquier extension que sea js o mjs que mjs es la de modulos
            test: /\.m?js$/,
            exclude: /node_modules/,
            use:{
                loader: 'babel-loader'
            }
        },
        {
            //reconoce todos los archivos css como todos los archivos stylus
            test: /\.css|.styl$/i,
            use: [MiniCSSExtractPlugin.loader,
            'css-loader',
            'stylus-loader'
            ],
        },
        {
            test: /\.png/,
            type: 'asset/resource'
        },
        {
            test: /\.(woff|woff2)$/,
            use:{
                loader: 'url-loader',
                options:{
                    limit: 10000,
                    mimetype: "application/font-woff",
                    name: "[name].[contenthash].[ext]",
                    outputPath: "../assets/fonts/",
                    publicPath: "../assets/fonts/",
                    esModule: false,

                }
            }
        }
    ]
    },
    plugins:[
        new HtmlWebpackplugin({
            //para hacer la insercion de los elementos
            inject: true,
            template: './public/index.html',
            filename: './index.html'
            

        }),
        new MiniCSSExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns:[
                {
                    from: path.resolve(__dirname, "src","assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
        // new BundleAnalyzerPlugin(),
    ],
    devServer:{
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback:true,
        port: 8080,
        open:true,
    }
   
}