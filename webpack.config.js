const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// подключаем плагин
const isDev = process.env.NODE_ENV === 'development';


module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        // тут описываются правила
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        } // весь JS обрабатывается пакетом babel-loader
         // исключает папку node_modules
      },
      {
        test: /\.css$/, // применять это правило только к CSS-файлам
        use: [
          (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
          'css-loader', 
          'postcss-loader'
      ] // к этим файлам нужно применить пакеты, которые мы уже установили
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/i,
        use: [
          'file-loader', // указали папку, куда складывать изображения
          {
              loader: 'image-webpack-loader',
              options: {  
                bypassOnDebug: true, 
                disable: true,  
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]'
        },
    ]
  },
  
  plugins: [
      new MiniCssExtractPlugin({ 
        filename: 'style.[contenthash].css' }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
                preset: ['default'],
        },
        canPrint: true
   }),
      new WebpackMd5Hash(),
      new webpack.DefinePlugin({
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
   }),
   new HtmlWebpackPlugin({
    // Означает, что:
    inject: false, // стили НЕ нужно прописывать внутри тегов
    template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
    filename: 'index.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
  })
    ]
};