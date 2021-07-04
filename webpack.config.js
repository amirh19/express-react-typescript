/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const outputDirectory = "dist";

module.exports = {
  entry: "./src/client/index.ts",
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "./js/[name].bundle.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "awesome-typescript-loader",
          },
        ],
        exclude: /node_modules/,
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
  resolve: {
    extensions: ["*", ".ts", ".js", ".json"],
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    proxy: {
      "/api/**": {
        target: "http://localhost:8050",
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
      title: "express-typescript-react",
    }),
    new CopyPlugin([{ from: "./src/client/assets", to: "assets" }]),
  ],
};
