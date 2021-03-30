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
    const options = [];

    for (const votingElement in req.body) {
      const optionTitle = req.body[votingElement];

      if (votingElement.includes("option") && 0 < optionTitle.length) {
        options.push({
          optionTitle,
          optionValue: 0,
        });
      }
    }

    const newVoting = new Voting({
      title,
      endDate,
      options,
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

// @route   GET voting/votings/:id
// @desc    Render detail voting
// @access  Public
Controller.getDetailVoting = async (req, res, next) => {
  try {
    const currentVotingId = req.params.id;
    const targetVoting = await Voting.findOne({ _id: currentVotingId });

    res.render("detailVoting", { voting: targetVoting });
  } catch (error) {
    console.error(error.message);
    next(createError(500, "Server Error"));
  }
};

// @route   POST voting/votings/:id
// @desc    Save select option in User, Voting
// @access  Private
Controller.postDetailVoting = async (req, res, next) => {
  try {
    const { option } = req.body;
    const votingId = req.params.id;
    const currentUserId = req.user._id;

    const currentUser = await User.findOne({ _id: currentUserId });

  } catch (error) {
    console.error(error.message);
    next(createError(500, "Server Error"));
  }
};

module.exports = Controller;
