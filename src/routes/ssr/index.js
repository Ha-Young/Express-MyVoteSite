const express = require("express");
const createError = require("http-errors");

const { HOME, MY_VOTINGS } = require("../../config/routes");
const voteService = require("../../services/voteService");
const authRoute = require("./auth");
const voteRoute = require("./vote");

module.exports = () => {
  const app = express.Router();

  app.get(HOME, (req, res, next) => {
    try {
      res.render("index");
    } catch (err) {
      return next(createError(err));
    }
  });

  app.get(MY_VOTINGS, async (req, res, next) => {
    console.log('here');
    try {
      const { _id: userId } = req.user;

      const { votes, error } = await voteService.GetVoteOfUser({ userId });

      if (error) {
        return next(createError(error));
      }

      res.render("myVotings", { votes: votes || {} });

    } catch (err) {
      return next(createError(err));
    }
  });

  authRoute(app);
  voteRoute(app);

  return app;
};
