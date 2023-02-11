import path from "path";

module.export = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js", // 通过占位符确保文件名称唯一
    path: __dirname + "/dist",
  },
  module: {
    rules: [
      {
        test: /\.txt$/, // test 指定匹配规则
        use: "roe-loader", // use 指定使用的loader
      },
    ],
  },
};
