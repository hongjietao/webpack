"use strict";
const path = require("path");
const { HotModuleReplacementPlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    search: "./src/search.js",
  },
  output: {
    clean: true,
    path: path.join(__dirname, "dist"),
    filename: "[name]_[chunkhash:8].js",
  },

  // 开启文件监听，默认值 false
  watch: false,
  // 只有开启文件监听时，watchOptions 才有意义
  watchOptions: {
    // 默认为空，不监听的文件或者文件夹，支持正则匹配
    ignored: /node_modules/,
    // 监听等待变化 300ms 再去执行，默认 300ms
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
    poll: 1000,
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

  plugins: [
    new HotModuleReplacementPlugin(), // css 文件指纹
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
  ],
  devServer: {
    // contentBase: "./dist", // webpack v4
    static: {
      directory: path.join(__dirname, "dist"),
    },
    hot: true,
  },
};
