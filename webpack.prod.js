/* eslint-disable strict */
'use strict';

const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugin = [];

  const entryFiles = glob.sync('./src/*/index.js');
  Object.keys(entryFiles).forEach((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];

    entry[pageName] = entryFile;
    htmlWebpackPlugin.push(
      // 压缩 html 文件，一个页面对应一个 HtmlWebpackPlugin
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: ['vendors', pageName], // 在页面script中引用
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
    );
  });
  return {
    entry,
    htmlWebpackPlugin,
  };
};

const { entry, htmlWebpackPlugin } = setMPA();

module.exports = {
  mode: 'production',
  entry,
  output: {
    clean: true,
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js',
  },

  plugins: [
    // css 文件指纹
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),

    // scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),

    // eslint-loader 已被废弃
    new ESLintPlugin(),

    // 通过cdn引入，降低打包速度
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://unpkg.com/react@18/umd/react.production.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry:
            'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
          global: 'ReactDOM',
        },
      ],
    }),

    new FriendlyErrorsWebpackPlugin(),
    function () {
      this.hooks.done.tap('done', (stats) => {
        if (
          stats.compilation.errors &&
          stats.compilation.errors.length &&
          process.argv.indexOf('-watch') === -1
        ) {
          console.log('build error');
          process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugin),

  optimization: {
    // minimize: true, // 可省略，默认最优配置：生产环境，压缩 true。开发环境，不压缩 false
    minimizer: [
      // 压缩css文件
      new CssMinimizerPlugin(),
      // 压缩 js 文件
      new TerserPlugin(),
    ],

    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          // test: /(react|react-dom)/,
          // name: "vendors",
          // chunks: "all",
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/, // test 指定匹配规则
        exclude: /node_modules/,
        use: ['babel-loader'], // use 指定使用的loader
      },
      {
        test: /\.css$/, // 解析 css
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // 链式调用，从右往左执行
      },
      {
        test: /\.less$/, // 解析 less
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|svg|png|jpeg)$/, // 解析图片资源
        type: 'asset/resource', // webpack 5 解析资源方式
        generator: {
          // 指定输出路径
          filename: 'img/[name]_[hash:8][ext]',
        },
        // use: "file-loader", // 已过时，webpack4才使用
      },
    ],
  },

  stats: 'errors-only',
};
