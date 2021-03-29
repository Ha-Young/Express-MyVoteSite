const passport = require("passport");
const createError = require("http-errors");

const User = require("../../models/User");
const Post = require("../../models/Voting");
const { log } = require("debug");

const Controller = {};

// @route   GET voting/votings/new
// @desc    Render newVoting Page
// @access  Public
Controller.getNewVoting = async (req, res, next) => {
  try {
    const votings = await Post.find();

    res.render("newVoting", { votings });
  } catch (error) {
    console.error(error.message);
    next(createError(500, "Server Error"));
  }
};

// @route   POST voting/votings/new
// @desc    Create New voting
// @access  Private
Controller.postNewVoting = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { title } = req.body;
    const endDate = req.body["end-date"];
    const votingList = [];

    for (const votingElement in req.body) {
      if (votingElement.includes("voting") && 0 < req.body[votingElement].length) {
        votingList.push(req.body[votingElement]);
      }
    }

    const newVoting = new Post({
      title,
      endDate,
      votingList,
      user: userId,
    });

    await newVoting.save();

    const newVotingInfo = await Post.findOne({ user: userId });
    const user = await User.findOne({ _id: userId });

    user.votingList.push(newVotingInfo._id);

    await user.save();
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
    next(createError(500, "Server Error"));
  }
};

// @route   GET voting/votings/my-votings
// @desc    Render my Votings page
// @access  Public
Controller.getMyVotings = async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error.message);
    next(createError(500, "Server Error"));
  }
};

module.exports = Controller;
