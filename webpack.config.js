const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const MODE = process.env.WEBPACK_ENV;
const ENTRY = path.resolve(__dirname, "src", "public", "assets", "js", "main.js");
const PATH = path.resolve(__dirname, "src", "public", "static");

module.exports = () => {
  return {
    entry: {
      main: ENTRY,
      shared: ["@babel/polyfill"],
    },
    output: {
      path: PATH,
      filename: "[name].js",
    },
    mode: MODE,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-proposal-class-properties"]
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugin() {
                    return [autoprefixer({ browsers: "cover 99.5%" })];
                  },
                },
              },
            },
            "sass-loader"
          ],
        },
        {
          test: [/\.png$/, /\.jpg$/],
          loader: "file-loader",
        },
      ],
    },
    devtool: "inline-source-map",
    plugins: [new MiniCssExtractPlugin()],
  };
};
