const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => {
  const commonConfig = {
    entry: "./src/js/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.s?css$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
  };

  const devConfig = {
    mode: "development",
    devServer: {
      contentBase: "./dist",
      hot: true,
    },
  };

  const prodConfig = {
    mode: "production",
    plugins: [new CleanWebpackPlugin()],
  };

  return env.mode === "development"
    ? merge(commonConfig, devConfig)
    : merge(commonConfig, prodConfig);
};
