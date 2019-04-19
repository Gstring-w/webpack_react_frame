/*
 *  react主要的打包文件
 *  1. 公共代码的分离
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackplugin = require("clean-webpack-plugin");

const HotModuleReplacrmentPlugin = require("webpack/lib/HotModuleReplacementPlugin");
const NameModulesPlugin = require("webpack/lib/NamedModulesPlugin");

const DefinePlugin = require("webpack/lib/DefinePlugin");

const path = require("path");
const fs = require("fs");
const loading = {
  html: fs.readFileSync(path.resolve(__dirname, "../src/assets/loading.html"))
};
const config = {
  context: path.resolve(__dirname, "../src"),

  entry: {
    index: [
      "react-hot-loader/patch",
      path.resolve(__dirname, "../src") + "/index.js"
    ]
  },
  output: {
    filename: "[name][hash:4].js",
    path: path.resolve(__dirname, "../dist")
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: path.resolve(__dirname, "../node_modules"),
        include: path.resolve(__dirname, "../src")
      }
    ]
  },

  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000
  },

  devServer: {
    port: 12306,
    hot: true
  },
  //js spliting
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: "common",
          chunks: "all",
          minSize: 1,
          minChunks: 2,
          priority: 1
        },
        vendor: {
          name: "vender",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new HotModuleReplacrmentPlugin(),
    new NameModulesPlugin(),
    new CleanWebpackplugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/assets/index.html"),
      filename: "index.html",
      loading: loading
    }),
    new DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ],
  mode: "development",
  devtool: "source-map"
};

module.exports = config;

/**
 * 文件监听的原理：定时获取这个文件的最后编辑时间，每次都存下来最新的最后的编辑时间，
 * 如果发现当前的时间和最后一次保存的时间不一致，就认为文件发生了变化。
 * 配置相中的watchOptions.poll 用于控制定时检查周期。 每秒检查多少次
 *  当发现每个文件改动时，不会立即告诉监听者，而是先缓存起来，收集一段时间的变化后，再一次性告诉监听者
 *
 */
