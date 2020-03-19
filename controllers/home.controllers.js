const NO_VOTES_MESSAGE = "🥺 등록된 투표가 없어요 🥺";

const Votes = require('../models/Votes');
const errors = require('../lib/errors');
const { getDisplayInfo } = require('../lib/helpers');

exports.renderVotes = async (req, res, next) => {
  try {
    const { allVotes } = res.locals;
    const loggedInUser = req.user || null;

    if (!allVotes.length) {
      return res.render('home', {
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

    voteDisplayInfoList.sort((a, b) => {
      return a.expires_at < b.expires_at ? -1 :
        a.expires_at > b.expires_at ? 1 : 0;
    });


    res.render('home', { allVotes: voteDisplayInfoList, loggedInUser, expiredVotesCounter });
  } catch(err) {
    next(new errors.GeneralError(err.message));
  }
};
