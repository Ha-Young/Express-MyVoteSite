const authChecker = require("./middlewares/authChecker");
const { API } = require("../config/routes");
const apiRoute = require("./api");
const ssrRoute = require("./ssr");

module.exports = app => {
  app.use(authChecker);
  app.use("/", ssrRoute());
  app.use(API.PREFIX, apiRoute());
};
