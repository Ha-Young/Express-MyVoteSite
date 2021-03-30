const Voting = require("../../models/Voting");
const createError = require("http-errors");
const errorMessage = require("../../constants/errorMessage");

exports.renderVotingsPage = async function (req, res, next) {
  try {
    const votings = await Voting.find();
    console.log(votings);

    res.status(200).render("votings");
  } catch (error) {
    console.log(error);
    next(createError(500, errorMessage.SERVER_ERROR));
  }
};
