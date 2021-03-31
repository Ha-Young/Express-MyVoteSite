const Voting = require("../../models/Voting");
const User = require("../../models/User");
const createError = require("http-errors");
const errorMessage = require("../../constants/errorMessage");

exports.renderMyVotingsPage = async function (req, res, next) {
  try {
    const userId = req.user._id;
    const userName = req.user.name;
    const userVotings = await User.findById(req.user._id).populate("votings");
    const votings = userVotings.votings;
    console.log("myVotings is", userVotings.votings);
    console.log(Array.isArray(userVotings.votings));
    console.log([1, 2, 3]);

    res.status(200).render("myVotings", { votings, userName, userId });
  } catch (error) {
    console.log(error);
    next(createError(500, errorMessage.SERVER_ERROR));
  }
};
