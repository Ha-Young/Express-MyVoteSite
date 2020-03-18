const NO_VOTES_MESSAGE = "🥺 등록된 투표가 없어요 🥺";

const Votes = require('../models/Votes');
const errors = require('../lib/errors');
const { makeDisplayInfo } = require('../lib/helpers');

exports.renderVotes = async (req, res, next) => {
  try {
    const currentUser = req.user ? req.user.username : null;
    const votes = await Votes.find().populate('created_by').lean();

    if (!votes.length) {
      return res.render('home', { message: NO_VOTES_MESSAGE, currentUser });
    }

    const votesInfoForDisplay = votes.map(vote => {
      return makeDisplayInfo(vote);
    });

    votesInfoForDisplay.sort((a, b) => {
      return a.expires_at < b.expires_at ? -1 :
        a.expires_at > b.expires_at ? 1 : 0;
    });

    res.render('home', { votes: votesInfoForDisplay, currentUser });
  } catch(err) {
    next(new errors.GeneralError(err.message));
  }
};

