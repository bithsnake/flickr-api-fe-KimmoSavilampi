const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'development',
    entry: {
        bundle : path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js', // lägga till en hash i slutet på finamnet för att skapa snapshots när ändringar händer på index.js
        clean: true, // ta bort den här om du vill ha snapshots på huvudfilen
        assetModuleFilename : '[name][ext]' // behåll asset namn
    },
    devtool : 'source-map', // perfekt för felsökning/debugging
    devServer: {
        static: {
            directory : path.resolve(__dirname, 'dist') // kör den här på servern
        },
        port: 3000, // standard port
        open: true, // öppna browsern automatiskt vid körning
        hot: true, // hot reload!
        compress: true, // gzip compression
        historyApiFallback : true
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [ 'style-loader','css-loader','sass-loader'],
            },
            {
                test: /\.js$/,
                exclude : /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], // transpiler, för typescript
                    } 
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Flickr APi', // används i title taggen
            filename: 'index.html',
            template : 'src/template.html' // min html mall
        }),
        //new BundleAnalyzerPlugin(),
    ]
}