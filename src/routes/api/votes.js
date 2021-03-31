const { Router } = require("express");
const createError = require("http-errors");

const voteService = require("../../services/voteService");
const { VOTES } = require("../../config/routes").API;

const route = Router();

module.exports = app => {
  app.use(VOTES.PREFIX, route);

  route.get(VOTES.VOTES, async (req, res, next) => {
    try {
      const { votesWithPage, error } = await voteService.GetVotes({ page: 0, limit: 1 });

      if (error) {
        return next(createError(error));
      }

      res.json(votesWithPage);
    } catch (err) {
      next(createError(err));
    }
  });
};
