const { resolve } = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    newtab: resolve(__dirname, "./src/newtab/index.jsx"),
    contextmenu: resolve(__dirname, "./src/contextmenu/index.jsx"),
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/newtab/index.html",
      filename: "newtab.html",
      chunks: ["newtab"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/contextmenu/index.html",
      filename: "contextmenu.html",
      chunks: ["contextmenu"],
    }),
    new CopyPlugin({
      patterns: [{ from: "public", to: "." }],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
