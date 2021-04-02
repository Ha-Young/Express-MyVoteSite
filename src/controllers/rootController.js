const createError = require("http-errors");
const Voting = require("../models/Voting");

exports.home = async (req, res, next) => {
  try {
    const votings = await Voting.find();

    res.render("home", { pageTitle: "Voting List", votings });
  } catch (err) {
    console.log("Failed find votings!");
    next(createError(500));
  }
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

exports.myVotings = async (req, res, next) => {
  if (req.user) {
    const { id } = req.user;

    try {
      const userVoting = await Voting.find({ "postedBy.id": id });

      res.render("myVoting", { pageTitle: "My Votings", userVoting });
    } catch (err) {
      console.log("Failed find user voting!");
      next(createError(500));
    }
  }
};
