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
        datetime: Joi.string().required(),
        vote_options: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      console.log(req.body);

      try {
        const newVote = req.body;
        newVote.vote_options = JSON.parse(vote.vote_options).map(option => ({
          ...option,
          count: 0,
        }));

        const { vote, error } = await voteService.createVote(newVote);

      } catch (err) {
        return next(createError(err));
      }
    }
  );
};
