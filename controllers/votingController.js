const Voting = require("../models/Voting");
const User = require("../models/User");
const { format } = require("date-fns");
const { getMaxVoterCount, getDisplayName } = require("../utils/votingHelpers");

exports.getNewVotingPage = function(req, res, next) {
  const { user } = req;
  const displayName = getDisplayName(user);

  res.render(
    "newVoting",
    { title: "New Voting",
      displayName,
      messages: req.flash("messages")
    }
  );
}

exports.postNewVoting = async function (req, res, next) {
  try {
    const { title, expireDate, options } = req.body;
    const { _id } = req.user;

    const votingOptionFormat = options.map(option => ({ title: option }));

    const newVoting = await Voting.create({
      title,
      expireDate,
      author: _id,
      options: votingOptionFormat,
    });

    await User.findByIdAndUpdate(
      { _id },
      { $push: { votingsCreatedByMe: newVoting._id }}
    );

    req.flash("messages", { message: "Registered your voting successfully!" });
    res.redirect("/votings/new");
  } catch (error) {
    next(error);
  }
};

exports.getSelectedVoting = async function (req, res, next) {
  try {
    const { params, user } = req;
    const isLoggedIn = Boolean(user);
    const {
      title,
      author,
      options,
      expireDate,
      isProceeding,
      winner
    } = await Voting.findById(params.id).populate("author").lean();

    const isAuthor = isLoggedIn && String(author._id) === String(user._id);
    const votingOptionFormat = options.map(option => {
      const { _id, title, voters } = option;

      if (isProceeding) {
        if (voters.length === getMaxVoterCount(options)) {
          winner.push(title);
        }
      }

      return {
        _id,
        title,
        voters,
      };
    });

    const votingDetailFormat = {
      title,
      isProceeding,
      winner,
      author: author.userName,
      contact: author.email,
      expireDate: format(expireDate, "yyyy/MM/dd"),
    };

    res.render("voting",
      { title: "Voting",
        votingDetailFormat,
        votingOptionFormat,
        isAuthor,
        messages: req.flash("messages")
      }
    );
  } catch (error) {
    next(error);
  }
};

exports.deleteVoting = function (req, res, next) {
    const { params, user } = req;
    const votingId = params.id;

    Voting.findByIdAndDelete(votingId, (error) => {
      if (error) {
        next(error);
        return;
      }

      User.findByIdAndUpdate(
        user._id,
        { $pull: {
            votingsCreatedByMe: { $in: [votingId] },
            myVotingList: { $in: [votingId] },
          }
        },
        { new: true },
        (error) => {
          if (error) {
            next(error);
            return;
          }

          res.status(200).json({ result: "voting deleted" });
        }
      );
    });

    // if (deletedVoting) {
    //   const updatedVoting = await User.findByIdAndUpdate(
    //     user._id,
    //     { $pull: {
    //         votingsCreatedByMe: { $in: [votingId] },
    //         myVotingList: { $in: [votingId] },
    //       }
    //     },
    //     { new: true },
    //   );
    // }

};

exports.updateVoting = async function (req, res, next) {
  try {
    const userId = req.user._id;
    const {
      votingId,
      selectedOptionId,
    } = req.body;
    const userVotingList = await User.findById({ _id: userId }).populate("myVotingList").lean();
    const isDuplicatedVoting = userVotingList.myVotingList.find(
      votingList => String(votingList._id) === String(votingId)
    );

    if (isDuplicatedVoting) {
      res.json("already voted");
      return;
    }

    await Voting.findOneAndUpdate(
      { _id: votingId },
      { $push: { 'options.$[option].voters': userId }},
      { arrayFilters: [{ "option._id": selectedOptionId }]}
    );
    await User.findByIdAndUpdate({ _id: userId }, { $push : { myVotingList: votingId }});

    res.json("user exist");
  } catch (error) {
    next(error);
  }
};
