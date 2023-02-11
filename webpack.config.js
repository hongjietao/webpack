"use strict";
const path = require("path");

module.export = {
  mode: "production",
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
        test: /.js$/, // test 指定匹配规则
        use: "babel-loader", // use 指定使用的loader
      },
    ],
  },
};
