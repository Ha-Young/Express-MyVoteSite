const express = require("express");
const createError = require("http-errors");

const { HOME } = require("../../config/routes");
const { GetAllVotes } = require("../../services/voteService");
const authRoute = require("./auth");
const voteRoute = require("./vote");

module.exports = () => {
  const app = express.Router();

  app.get(HOME, async (req, res, next) => {
    try {
      const { votes } = await GetAllVotes();

      res.render("index", { votes: votes || {} });
    } catch (err) {
      return next(createError(err));
    }
  });

  authRoute(app);
  voteRoute(app);

  return app;
};
