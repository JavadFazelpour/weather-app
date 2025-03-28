const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    assetModuleFilename: "images/[hash][ext][query]", // Organizes images in a separate folder
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", { loader: "css-loader", options: { url: true } }],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // Handles images as separate files
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/, // Handles font files
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]", // Ensures correct font output location
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
