const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "public", "javascripts"),
  output: {
    path: path.resolve(__dirname, "static"),
    filename: "[name].[format]",
  },
};
