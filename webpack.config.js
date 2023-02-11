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
    ],
  },
};
