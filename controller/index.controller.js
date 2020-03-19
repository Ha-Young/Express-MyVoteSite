const createError = require('http-errors');
const Voting = require('../models/Voting');
const util = require('../lib/util');

exports.getAllorMyVotes = async (req, res, next) => {
  try {
    const votes = await Voting.find().populate('made');
    if (!votes) return next(createError(404, 'We can not find the votes for unknown reasons. Try again.'));

    let dividedVotes = [];
    const isMyVotes = req.url.slice(-10) === 'my-votings';
    isMyVotes
      ? dividedVotes = util.divideVotes(votes, req.user._id)
      : dividedVotes = util.divideVotes(votes);

    if (!req.user) return res.render('index', { ongoingVotes: dividedVotes[0], completedVotes: dividedVotes[1] });
    const user = req.user.email.split('@')[0];
    res.render('index', { user, ongoingVotes: dividedVotes[0], completedVotes: dividedVotes[1] });
  } catch (err) {
    next(err);
  }
}
