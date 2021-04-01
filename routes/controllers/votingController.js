const User = require("../../models/User");
const Voting = require("../../models/Voting");

const getDateFormat = require("../../utils/getDateFormat");
const validateDate = require("../../utils/validateDate");
const handleError = require("../../utils/handleError");

const VOTING = require("../../constants/votingConstants");

const Controller = {};

Controller.getAllVotings = async (req, res, next) => {
  try {
    const votings = await Voting.find();
    const currentUser = req.user;

    votings.forEach(async (voting) => {
      const votingEndDate = voting.endDate;
      const isProgress = validateDate(votingEndDate, Date.now());

      if (!isProgress && voting.isProgress) {
        voting.isProgress = isProgress;
        await voting.save();
      }
    });



    res.render("index", { votings, user: currentUser });
  } catch (error) {
    console.error(error.message);
    next(handleError(500, error));
  }
};

Controller.getNewVoting = async (req, res, next) => {
  try {
    const votings = await Voting.find();

    res.render("newVoting", { votings });
  } catch (error) {
    console.error(error.message);
    next(handleError(500, error));
  }
};

Controller.postNewVoting = async (req, res, next) => {
  try {
    const currentUserId = req.user._id;
    const { title } = req.body;
    const endDate = getDateFormat(req.body["end-date"]);
    const isProgress = validateDate(endDate, Date.now());

    if (!isProgress) {
      return res.render("failure", { message: VOTING.TIME_OUT_MESSAGE });
    }

    const filteredOptions = req.body.option.filter(option => option.length > 0);
    const options = filteredOptions.map(option => {
      return { title: option, value: 0 };
    });

    const newVoting = new Voting({
      title,
      endDate,
      options,
      user: currentUserId,
    });

    await newVoting.save();

    const user = await User.findById({ _id: currentUserId });

    user.votingList.push(newVoting._id);

    await user.save();
    res.render("success", {
      message: VOTING.SUCCESS_PRODUCE_MESSAGE,
      newVoting,
    });
  } catch (error) {
    console.error(error.message);
    next(handleError(500, error));
  }
};

Controller.getMyVotings = async (req, res, next) => {
  try {
    const currentUserId = req.user._id;

    User.findById({ _id: currentUserId })
      .populate("votingList")
      .exec((error, voting) => {
        if (error) {
          console.error(error.message);
          return next(handleError(500, error));
        }

        res.render("myVotings", { myVotings: voting.votingList });
      });
  } catch (error) {
    console.error(error.message);
    next(handleError(500, error));
  }
};

Controller.getDetailVoting = async (req, res, next) => {
  try {
    const currentVotingId = req.params.id;
    const currentUser = req.user;

    Voting.findById({ _id: currentVotingId })
      .populate("user")
      .exec((error, voting) => {
        if (error) {
          console.error(error.message);
          return next(handleError(500, error));
        }

        const author = voting.user;
        const isAuthor =  currentUser
          ? (currentUser._id.toString() === author._id.toString())
          : false;

        if (voting.isProgress) {
          res.render("detailVoting", {
            voting,
            author: author.email,
            isAuthor,
          });
        } else {
          let highestOption = { value: 0 };

          voting.options.forEach(option => {
            if (highestOption.value < option.value) {
              highestOption = option;
            }
          });

          res.render("resultVoting", {
            voting,
            author: author.email,
            isAuthor,
            highestOption,
          });
        }
      });
  } catch (error) {
    console.error(error.message);
    next(handleError(500, error));
  }
};

Controller.patchDetailVoting = async (req, res, next) => {
  try {
    const { checkedOption } = req.body;
    const votingId = req.params.id;
    const userId = req.user._id;

    const voting = await Voting.findById({ _id: votingId });

    const isVotedUser = voting.votingUserList.some(userVotedId =>
      userVotedId.toString() === userId.toString()
    );

    if (!isVotedUser) {
      voting.options.forEach(option => {
        if (option.title === checkedOption) {
          option.value += VOTING.OPTION_UPPER_VALUE;
        }
      });

      voting.votingUserList.push(userId);

      await voting.save();

      res.status(200).json({ message: VOTING.SUCCESS_VOTING_MESSAGE });
    } else {
      return res.status(400).json({ message: VOTING.ALREADY_VOTED_MESSAGE });
    }
  } catch (error) {
    console.error(error.message);
    next(handleError(500, error));
  }
};

Controller.deleteVoting = async (req, res, next) => {
  try {
    const votingId = req.params.id;
    const currentUserId = req.user._id;

    await Voting.findByIdAndDelete({ _id: votingId });

    const user = await User.findById({ _id: currentUserId });

    user.votingList.forEach((voting, index) => {
      if (voting.toString() === votingId) {
        user.votingList.splice(index, 1);
      }
    });

    await user.save();

    res.status(201).end();
  } catch (error) {
    console.error(error.message);
    next(handleError(500, error));
  }
};

module.exports = Controller;
