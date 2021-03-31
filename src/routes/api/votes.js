const { Router } = require("express");
const createError = require("http-errors");

const voteService = require("../../services/voteService");
const { VOTES } = require("../../config/routes").API;

const route = Router();

module.exports = app => {
  app.use(VOTES.PREFIX, route);

  route.get(VOTES.VOTES, async (req, res, next) => {
    try {
      const { votes, error } = await voteService.GetAllVotes();

      if (error) {
        return next(createError(error));
      }

      res.json(votes);
    } catch (err) {
      next(createError(err));
    }
  });
};
