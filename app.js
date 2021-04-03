const express = require("express");


const app = express();

(async function () {
  await require("./src/loaders")({ expressApp: app });
})();

module.exports = app;
