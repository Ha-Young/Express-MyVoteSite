const createError = require("http-errors");

const User = require("../../models/User");
const Voting = require("../../models/Voting");

const getDateFormat = require("../../utils/getDateFormat");
const validateDate = require("../../utils/validateDate");

const Controller = {};

// @route   GET /
// @desc    Render allVotings page
// @access  Public
Controller.getAllVotings = async (req, res, next) => {
  try {
    const votings = await Voting.find();

    votings.forEach(async (voting) => {
      const votingEndDate = voting.endDate;
      const isExpiration = validateDate(votingEndDate, Date.now());

      if (!isExpiration && voting.isProgress) {
        voting.isProgress = isExpiration;
        await voting.save();
      }
    });

    res.render("index", { votings });
  } catch (error) {
    console.error(error.message);
    next(createError(500, "Server Error"));
  }
};

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
    const options = [];
    const endDate = getDateFormat(req.body["end-date"]);

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
      const user = await User.findById({ _id: userId });

      user.myVotingList.push(savedVoting._id);

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
    const voting = await Voting.findById({ _id: currentVotingId });

    Voting.findById({ _id: currentVotingId })
      .populate("user")
      .exec((err, data) => {
        if (err) return res.render("error", { message: err.message });
        res.render("detailVoting", { voting, author: data.user.email });
      });
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
    const selectOption = req.body.option;
    const votingId = req.params.id;
    const userId = req.user._id;

    const user = await User.findById({ _id: userId });

    if (user.votedList.includes(votingId)) {
      return res.render("error", { message: "이미 투표하셨습니다." });
    }

    user.votedList.push(votingId);
    await user.save();

    const voting = await Voting.findById({ _id: votingId });

    for (let i = 0; i < voting.options.length; i++) {
      if (voting.options[i].optionTitle === selectOption) {
        voting.options[i].optionValue += 1;
        break;
      }
    }

    await voting.save();
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
    next(createError(500, "Server Error"));
  }
};

module.exports = Controller;
