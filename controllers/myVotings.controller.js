const createError = require('http-errors');
const Voting = require('../models/Voting');

exports.getMyVotings = async function (req, res, next) {
  try {
    await Voting.updateExpiredVotingStatus(new Date());

    const votings = await Voting.find({ author: req.user });

    res.render('myVotings', { votings })
  } catch (err) {
    next(createError(500, err));
  }
};
