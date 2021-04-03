const express = require("express");
const auth = require("./auth");
const vote = require("./votes");

// guaranteed to get dependencies
module.exports = () => {
  const app = express.Router();

  app.get("/", (req, res) => {
    res.json({
      api_page: true,
    });
  });

  auth(app);
  vote(app);

  return app;
};
