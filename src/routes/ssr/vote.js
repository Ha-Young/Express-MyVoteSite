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
        const { vote, error } = await voteService.GetVote(voteId);

        if (error) {
          throw new Error("can't get vote detail");
        }

        if (vote.is_process) {
          return res.json("진행 중");
        }

        return res.json("결과");
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
