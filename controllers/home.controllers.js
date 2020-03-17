const NO_VOTES_MESSAGE = "🥺 등록된 투표가 없어요 🥺";

const Votes = require('../models/Votes');
const errors = require('../lib/errors');
const { makeVisualData } = require('../lib/helpers');

exports.renderVotes = async (req, res, next) => {
  try {
    const votes = await Votes.find().populate('created_by').lean();

    if (!votes.length) {
      return res.render('home', { message: NO_VOTES_MESSAGE });
    }

    const visualDataList = [];
    votes.forEach(vote => {
      visualDataList.push(makeVisualData(vote));
    });

    res.render('home', { votes: visualDataList });
  } catch(err) {
    next(new errors.GeneralError(err.message));
  }
};
