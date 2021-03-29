const routes = require("../routes");

module.exports = function ({ app }) {
  app.use('/', routes());
};
