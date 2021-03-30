const createError = require("http-errors");
const { celebrate, Joi } = require("celebrate");
const { Router } = require("express");

const voteService = require("../../services/voteService");
const { PREFIX, DETAIL, ERROR, NEW, SUCCESS } = require("../../config/routes").VOTE;
const isLogin = require("../middlewares/isLogin");

const route = Router();

module.exports = app => {
  app.use(PREFIX, isLogin, route);

  route.get(NEW, (req, res) => {
    res.render("voteCreate");
  });

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
        const { vote, error } = await voteService.CreateVote({
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
