const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const MODE = process.env.WEBPACK_ENV;
const ENTRY = path.resolve(__dirname, "src", "public", "assets", "js", "main.js");
const PATH = path.resolve(__dirname, "src", "public", "static");

module.exports = () => {
  return {
    entry: ENTRY,
    mode: MODE,
    module: {
      rules: [
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
    output: {
      path: PATH,
      filename: "main.js",
    },
    plugins: [new MiniCssExtractPlugin()],
  };
};
