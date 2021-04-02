const Voting = require("../models/Voting");
const { getMaxVoterCount, checkExpireDate } = require("../utils/votingHelpers");

exports.getVotings = async function(req, res, next) {
  try {
    const displayName = req.user ? req.user.userName : null;
    const votings = await Voting.find().populate("author").lean();

    const homeVotingDisplayList = votings.map(voting => {
      const isProceeding = checkExpireDate(voting.expireDate);
      const winner = [];

      if (!isProceeding) {
        const maxCount = getMaxVoterCount(voting.options);

        voting.options.forEach(option => {
          if (option.voters.length >= maxCount) {
            winner.push(option.optionTitle);
          }
        });
      }

      return {
        _id: voting._id,
        title: voting.title,
        author: voting.author.userName,
        authorEmail: voting.author.email,
        expireDate: voting.expireDate,
        isProceeding: isProceeding,
        winner: winner,
      }
    });

    res.render(
      "index",
      { title: "Home",
        displayName,
        homeVotingDisplayList,
        error: req.flash("error")
      }
    );
  } catch (error) {
    next(error);
  }
};
