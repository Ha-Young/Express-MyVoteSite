const config = require("../config");
const apiRoute = require("./api");
const ssrRoute = require("./ssr");

module.exports = app => {
  app.use("/", ssrRoute());
  // app.use(config.api.prefix, apiRoute());
};
