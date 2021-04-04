const Voting = require("../../models/Voting");
const createError = require("http-errors");
const { INTERNAL_SERVER_ERROR } = require("../../constants/errorMessage");

exports.getAll = async (req, res, next) => {
  await Voting.find()
  .lean()
  .exec((err, votings) => {
    try {
      res.render("index", { votings });
    } catch (err) {
      return next(createError(500, INTERNAL_SERVER_ERROR));
    }
  });
};

exports.create = async (req, res, next) => {
  try {
    const { title, expiryDate, options } = req.body;
    const { email } = req.user;

    const votingOptions = options.map((option) => {
      return { option }
    });

    await new Voting({
      title,
      expiryDate,
      generator: email,
      options: votingOptions,
    }).save();

    return res.redirect("/");
  } catch (err) {
    return next(createError(500, INTERNAL_SERVER_ERROR));
  }
};
