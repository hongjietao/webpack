"use strict";
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js",
    search: "./src/search.js",
  },
  output: {
    clean: true,
    path: path.join(__dirname, "dist"),
    filename: "[name]_[chunkhash:8].js",
  },

  plugins: [
    // css 文件指纹
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
    // 压缩 html 文件，一个页面对应一个 HtmlWebpackPlugin
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/search.html"),
      filename: "search.html",
      chunks: ["search"],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html"),
      filename: "index.html",
      chunks: ["index"],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
  ],

  optimization: {
    minimize: true, // 可省略，默认最优配置：生产环境，压缩 true。开发环境，不压缩 false
    minimizer: [
      // 压缩css文件
      new CssMinimizerPlugin(),
      // 压缩 js 文件
      new TerserPlugin(),
    ],
  },

  module: {
    rules: [
      {
        test: /\.js$/, // test 指定匹配规则
        use: "babel-loader", // use 指定使用的loader
      },
      {
        test: /\.css$/, // 解析 css
        use: [MiniCssExtractPlugin.loader, "css-loader"], // 链式调用，从右往左执行
      },
      {
        test: /\.less$/, // 解析 less
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.(jpe?g|svg|png|jpeg)$/, // 解析图片资源
        type: "asset/resource", // webpack 5 解析资源方式
        generator: {
          // 指定输出路径
          filename: "img/[name]_[hash:8][ext]",
        },
        // use: "file-loader", // 已过时，webpack4才使用
      },
    ],
  },
};
