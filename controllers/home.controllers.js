const { getDisplayInfo, sortVotesByExpiration } = require("../lib/helpers");
const errors = require("../lib/errors");

const NO_VOTES_MESSAGE = "🥺 등록된 투표가 없어요 🥺";

exports.renderVotes = async (req, res, next) => {
  try {
    const { allVotes } = res.locals;
    const loggedInUser = req.user || null;

    if (!allVotes.length) {
      return res.render("home", {
        message: NO_VOTES_MESSAGE,
        loggedInUser
      });
    }

    let expiredVotesCounter = 0;
    const voteDisplayInfoList = [];

    allVotes.forEach(vote => {
      if (vote.expired) expiredVotesCounter++;
      voteDisplayInfoList.push(getDisplayInfo(vote));
    });

    const sortedVoteList = sortVotesByExpiration(voteDisplayInfoList);

    res.render("home", { allVotes: sortedVoteList, loggedInUser, expiredVotesCounter });
  } catch(err) {
    next(new errors.GeneralError(err.message));
  }
};
