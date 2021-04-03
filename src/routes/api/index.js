const express = require("express");
const vote = require("./votes");

// guaranteed to get dependencies
module.exports = () => {
  const app = express.Router();

  app.get("/", (req, res) => {
    res.json({
      api_page: true,
    });
  });

  vote(app);

  return app;
};
