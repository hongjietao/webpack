"use strict";
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    search: "./src/search.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js", // 通过占位符确保文件名称唯一
  },

  // 开启文件监听，默认值 false
  watch: false,
  // 只有开启文件监听时，watchOptions 才有意义
  watchOptions: {
    // 默认为空，不监听的文件或者文件夹，支持正则匹配
    ignore: /node_modules/,
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
        use: ["style-loader", "css-loader"], // 链式调用，从右往左执行
      },
      {
        test: /\.less$/, // 解析 less
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(jpe?g|svg|png|jpeg)$/, // 解析图片资源
        type: "asset/resource", // webpack 5 解析资源方式
        generator: {
          // 指定输出路径
          filename: "img/[hash][ext][query]",
        },
        // use: "file-loader", // 已过时，webpack4才使用
      },
    ],
  },
};
