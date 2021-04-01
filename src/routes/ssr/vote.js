const createError = require("http-errors");
const { celebrate, Joi } = require("celebrate");
const { Router } = require("express");

const voteService = require("../../services/voteService");
const {
  PREFIX,
  DETAIL,
  ERROR,
  NEW,
  SUCCESS,
} = require("../../config/routes").VOTE;
const isLogin = require("../middlewares/isLogin");

const route = Router();

module.exports = app => {
  app.use(PREFIX, isLogin, route);

  route.get(NEW, (req, res) => {
    res.render("voteCreate");
  });

  route.get(
    DETAIL,
    celebrate({
      params: {
        vote_id: Joi.string().required(),
      },
    }),
    async (req, res, next) => {
      try {
        const { vote_id: voteId } = req.params;

        const { vote, error } = await voteService.GetVote({ voteId, user: req.user });

        if (error) {
          throw new Error("can't get vote detail");
        }

        res.locals.vote = vote;

        if (vote.is_process) {
          return res.render("voteDetail");
        }

        return res.render("voteResult");
      } catch (err) {
        return next(createError(err));
      }
    }
  );

  route.delete(
    DETAIL,
    celebrate({
      params: {
        vote_id: Joi.string().required(),
      },
    }),
    async (req, res, next) => {
      try {
        const { vote_id: voteId } = req.params;

        const { vote, error } = await voteService.DeleteVote(voteId);

        if (error) {
          throw new Error("can't delete vote");
        }

        res.locals.vote = vote;

        res.redirect("/");
      } catch (err) {
        return next(createError(err));
      }
    }
  );

  route.post(
    NEW,
    celebrate({
      body: Joi.object({
        title: Joi.string().required(),
        expire_datetime: Joi.string().required(),
        vote_options: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      try {
        const { error } = await voteService.CreateVote({
          voteInputDTO: req.body,
          user: req.user,
        });

        if (error) {
          return next(createError(error));
        }

        res.redirect("/");
      } catch (error) {
        return next(createError(error));
      }
    }
  );
};
