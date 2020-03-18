const NO_VOTES_MESSAGE = "🥺 등록된 투표가 없어요 🥺";

const Votes = require('../models/Votes');
const errors = require('../lib/errors');
const { makeDisplayInfo } = require('../lib/helpers');

exports.renderVotes = async (req, res, next) => {
  try {
    const votes = await Votes.find().populate('created_by').lean();
    const loggedInUser = req.user ? req.user : null;

    if (!votes.length) {
      return res.render('home', { message: NO_VOTES_MESSAGE, loggedInUser });
    }

    const votesInfoForDisplay = votes.map(vote => makeDisplayInfo(vote));

    votesInfoForDisplay.sort((a, b) => {
      return a.expires_at < b.expires_at ? -1 :
        a.expires_at > b.expires_at ? 1 : 0;
    });

    res.render('home', { votes: votesInfoForDisplay, loggedInUser });
  } catch(err) {
    next(new errors.GeneralError(err.message));
  }
};
