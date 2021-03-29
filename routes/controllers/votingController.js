const createError = require("http-errors");

const User = require("../../models/User");
const Voting = require("../../models/Voting");

const Controller = {};

// @route   GET voting/votings/new
// @desc    Render newVoting Page
// @access  Public
Controller.getNewVoting = async (req, res, next) => {
  try {
    const votings = await Voting.find();

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
    const votingElements = {};

    for (const votingElement in req.body) {
      const votingValue = req.body[votingElement];

      if (votingElement.includes("voting") && 0 < votingValue.length) {
        votingElements[votingValue] = [];
      }
    }

    const newVoting = new Voting({
      title,
      endDate,
      votingElements,
      user: userId,
    });

    newVoting.save().then(async (savedVoting) => {
      const user = await User.findOne({ _id: userId });

      user.votingList.push(savedVoting._id);

      await user.save();
      res.redirect("/");
    });
  } catch (error) {
    console.error(error.message);
    next(createError(500, "Server Error"));
  }
};

// @route   GET voting/votings/my-votings
// @desc    Render my Votings page
// @access  Private
Controller.getMyVotings = async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error.message);
    next(createError(500, "Server Error"));
  }
};

module.exports = Controller;
