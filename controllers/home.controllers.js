const NO_VOTES_MESSAGE = "🥺 등록된 투표가 없어요 🥺";

const Votes = require('../models/Votes');
const errors = require('../lib/errors');
const { getDisplayInfo } = require('../lib/helpers');

exports.renderVotes = async (req, res, next) => {
  try {
    const { votes } = res.locals;
    const loggedInUser = req.user ? req.user : null;

    if (!votes.length) {
      return res.render('home', {
        message: NO_VOTES_MESSAGE,
        loggedInUser,
        votes
      });
    }

    let expiredCounter = 0;
    const voteDisplayInfo = [];
    votes.forEach(vote => {
      if (vote.expired) expiredCounter++;
      voteDisplayInfo.push(getDisplayInfo(vote));
    });

    voteDisplayInfo.sort((a, b) => {
      return a.expires_at < b.expires_at ? -1 :
        a.expires_at > b.expires_at ? 1 : 0;
    });

    res.render('home', { votes: voteDisplayInfo, loggedInUser, expiredCounter });
  } catch(err) {
    next(new errors.GeneralError(err.message));
  }
};
