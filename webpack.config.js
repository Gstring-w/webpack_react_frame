const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackplugin = require("clean-webpack-plugin");

const path = require("path");
const fs = require("fs");
const loading = {
  html: fs.readFileSync(path.resolve(__dirname, "./src/assets/loading.html"))
};
const config = {
  entry: {
    index: "./src/index.js"
  },
  output: {
    filename: "[name][hash:4].js",
    path: path.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"]
      }
    ]
  },

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
    new CleanWebpackplugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/assets/index.html"),
      filename: "index.html",
      loading: loading
    })
  ],
  mode: "production",
  devtool: "source-map"
};

module.exports = config;
