"use strict";
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

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
  ],

  optimization: {
    minimizer: [
      // 压缩css文件
      new CssMinimizerPlugin(),
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
