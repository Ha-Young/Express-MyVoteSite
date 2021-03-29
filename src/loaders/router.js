const routes = require("../routes/ssr");

module.exports = function ({ app }) {
  app.use('/', routes());
};
