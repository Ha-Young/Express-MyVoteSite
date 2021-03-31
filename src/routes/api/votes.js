const createError = require("http-errors");
const { celebrate, Joi } = require("celebrate");
const { Router } = require("express");

const voteService = require("../../services/voteService");
const { VOTES } = require("../../config/routes").API;

const route = Router();

module.exports = app => {
  app.use(VOTES.PREFIX, route);

  route.get(
    VOTES.VOTES,
    celebrate({
      query: {
        condition: Joi.string().required(),
        page: Joi.number(),
        limit: Joi.number(),
        sort_field: Joi.string(),
        sort_order: Joi.number(),
      },
    }),
    async (req, res, next) => {
      try {
        const {
          condition,
          page,
          limit,
          sort_field,
          sort_order,
        } = req.query;

        const { votesWithPage, error } = await voteService.GetVotes({
          condition,
          page: page || 0,
          limit: limit || 10,
          sort_field,
          sort_order,
        });

        if (error) {
          return next(createError(error));
        }

        res.json(votesWithPage);
      } catch (err) {
        next(createError(err));
      }
    });
};
