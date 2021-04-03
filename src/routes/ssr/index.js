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
    try {
      const { _id: userId } = req.user;

      const { votes, error } = await voteService.GetVoteOfUser({ userId });

      if (error) {
        return next(createError(error));
      }

      const refinedVotes = votes.map(vote => refineVoteOnDate(vote));

      res.render("myVotings", { votes: refinedVotes || {} });

    } catch (err) {
      return next(createError(err));
    }
  });

  authRoute(app);
  voteRoute(app);

  return app;
};

function refineVoteOnDate(vote) {
  const refinedVote = { ...vote };

  const startDate = new Date(refinedVote.createdAt);
  const expiredDate = new Date(refinedVote.expire_datetime);
  const todayDate = new Date();
  refinedVote.expiredDateLocaleString = expiredDate.toLocaleString();

  const percentage = Math.round(((todayDate - startDate) / (expiredDate - startDate)) * 100) + "%";

  refinedVote.expiredPercent = refinedVote.is_progress ? percentage : "100%";

  return refinedVote;
}
