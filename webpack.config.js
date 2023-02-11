"use strict";
const path = require("path");

module.export = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js", // 通过占位符确保文件名称唯一
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.js$/, // test 指定匹配规则
        use: "babel-loader", // use 指定使用的loader
      },
    ],
  },
};
