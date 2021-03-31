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

    await newVoting.save();
    res.status(301).redirect("/");
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
    const currentUserId = req.user._id;

    const myVotings = await Voting.find()
      .where("user")
      .in(currentUserId)
      .exec();

    res.render("myVotings", { myVotings });
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
    const currentUser = req.user;
    let isAuthor = false;

    Voting.findById({ _id: currentVotingId })
      .populate("user")
      .exec((err, data) => {
        if (err) return res.render("error", { message: err.message });
        if (currentUser) {
          isAuthor = (currentUser._id.toString() === data.user._id.toString());
        }

        res.render("detailVoting", {
          voting,
          author: data.user.email,
          isAuthor,
        });
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

    const isVotedUser = user.votedList.some(userVotedId =>
      userVotedId.toString() === votingId.toString()
    );

    if (!isVotedUser) {
      user.votedList.push(votingId);
      await user.save();

      const voting = await Voting.findById({ _id: votingId });

      voting.options.forEach(option => {
        if (option.optionTitle === selectOption) {
          option.optionValue += 1;
        }
      });

      voting.votingUserList.push(userId);

      await voting.save();
      res.status(301).redirect("/");
    } else {
      return res.render("error", { message: "이미 투표하셨습니다." });
    }
  } catch (error) {
    console.error(error.message);
    next(createError(500, "Server Error"));
  }
};

// @route   Delete voting/votings/:id
// @desc    Modify User's voting, voted list of deleted voting
// @access  Private
Controller.deleteVoting = async (req, res, next) => {
  try {
    const votingId = req.params.id;

    await Voting.findByIdAndDelete({ _id: votingId });
  } catch (error) {
    console.error(error.message);
    next(createError(500, "Server Error"));
  }
};

module.exports = Controller;
