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

    await Promise.all(votings.map(async (voting) => {
      const { endDate } = voting;
      const isProgressNow = validateDate(endDate, Date.now());

      if (!isProgressNow && voting.isProgress) {
        await voting.update({ isProgress: isProgressNow });
      }
    }));

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
    const { title, option } = req.body;
    const endDate = getDateFormat(req.body["end-date"]);
    const isCorrectDate = validateDate(endDate, Date.now());

    if (!isCorrectDate) {
      return res.redirect("/voting/votings/error");
    }

    const unusedFilteredOptions = option.filter(
      option => VOTING.OPTION_LIMIT_LENGTH < option.length
    );

    const options = unusedFilteredOptions.map(option => {
      return { title: option, value: VOTING.OPTION_DEFAULT_VALUE };
    });

    const newVoting = new Voting({
      title,
      endDate,
      options,
      author: currentUserId,
    });

    await newVoting.save();

    const user = await User.findById({ _id: currentUserId });

    user.producedVotes.push(newVoting._id);

    await user.save();

    res.redirect(`/voting/votings/success/${newVoting._id}`);
  } catch (error) {
    console.error(error.message);
    next(handleError(500, error));
  }
};

Controller.getSuccessVoting = async (req, res, next) => {
  try {
    const newVotingId = req.params.id;
    const newVoting = await Voting.findById({ _id: newVotingId }).lean();

    res.render("success", {
      message: VOTING.SUCCESS_PRODUCE_MESSAGE,
      newVoting,
    });
  } catch (error) {
    console.error(error.message);
    next(handleError(500, error));
  }
};

Controller.getFailureVoting = async (req, res, next) => {
  try {
    res.render("failure");
  } catch (error) {
    console.error(error.message);
    next(handleError(500, error));
  }
};

Controller.getMyVotings = async (req, res, next) => {
  try {
    const currentUserId = req.user._id;

    User.findById({ _id: currentUserId })
      .populate("producedVotes")
      .exec((error, user) => {
        if (error) {
          console.error(error.message);
          return next(handleError(500, error));
        }

        res.render("myVotings", { myVotings: user.producedVotes });
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
      .populate("author")
      .exec((error, voting) => {
        if (error) {
          console.error(error.message);
          return next(handleError(500, error));
        }

        const { author, options, isProgress } = voting;
        const isAuthor =  currentUser
          ? (currentUser._id.toString() === author._id.toString())
          : false;

        if (isProgress) {
          res.render("detailVoting", {
            voting,
            author: author.email,
            isAuthor,
          });
        } else {
          let highestValue;

          options.forEach(option => {
            const { value } = option;

            if (!highestValue) {
              return highestValue = value;
            }

            if (highestValue < value) {
              highestValue = value;
            }
          });

          res.render("resultVoting", {
            voting,
            author: author.email,
            isAuthor,
            highestValue,
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
    const currentUserId = req.user._id;

    const voting = await Voting.findById({ _id: votingId });

    const isVotedUser = voting.votingUserList.some(userVotedId =>
      userVotedId.toString() === currentUserId.toString()
    );

    if (!isVotedUser) {
      const { options, votingUserList } = voting;

      options.forEach(option => {
        if (option.title === checkedOption) {
          option.value += VOTING.OPTION_UPPER_VALUE;
        }
      });

      votingUserList.push(currentUserId);

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

    user.producedVotes.forEach((voting, index) => {
      if (voting.toString() === votingId) {
        user.producedVotes.splice(index, 1);
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
