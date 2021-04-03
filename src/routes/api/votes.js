const createError = require("http-errors");
const { celebrate, Joi } = require("celebrate");
const { Router } = require("express");

const voteService = require("../../services/voteService");
const userService = require("../../services/userService");
const { VOTES } = require("../../config/routes").API;
const { ObjectId } = require("mongoose").Types;

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
        const { condition, page, limit, sort_field, sort_order } = req.query;
        console.log("start", req.query);
        const { votesWithPage, error } = await voteService.GetVotes({
          condition,
          page: page || 1,
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
    }
  );

  route.get(
    VOTES.VOTE,
    celebrate({
      params: {
        vote_id: Joi.string().required(),
      },
    }),
    async (req, res, next) => {
      try {
        const { vote_id: voteId } = req.params;

        const { vote, error } = await voteService.GetVote({
          voteId,
          user: req.user,
        });

        if (error) {
          return next(createError(error));
        }

        res.json(vote);
      } catch (err) {
        next(createError(err));
      }
    }
  );

  route.patch(
    VOTES.VOTE_TO_OPTION,
    celebrate({
      body: Joi.object({
        optionId: Joi.string().required(),
      }),
      params: {
        vote_id: Joi.string().required(),
      },
    }),
    async (req, res, next) => {
      if (!req.user || !ObjectId.isValid(req.user._id)) {
        return next(createError(401));
      }

      try {
        const { vote_id: voteId } = req.params;
        const { optionId } = req.body;
        const userId = req.user._id;

        const { isAreadyVote, error: checkError } = await userService.CheckAreadyVote({ userId, voteId });

        if (isAreadyVote) {
          return res.json({
            result: false,
            areadyVoted: true,
          });
        }

        if (checkError) {
          return next(createError(checkError));
        }

        const { error: voteServiceError } = await voteService.VoteToOption({ voteId, optionId });

        if (voteServiceError) {
          return next(createError(voteServiceError));
        }

        const { error: userServiceError } = await userService.VoteToOption({ userId, voteId });

        if (userServiceError) {
          return next(createError(userServiceError));
        }

        res.json({ result: true });

      } catch (error) {
        next(createError(error));
      }
    }
  );
};
