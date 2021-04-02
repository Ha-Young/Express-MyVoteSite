const createError = require('http-errors');
const Voting = require('../models/Voting');

exports.getVotings = async function (req, res, next) {
  try {
    await Voting.updateExpiredVotingStatus(new Date());

    const votings = await Voting.find().populate('author');

    res.render('home', { votings });
  } catch (err) {
    next(createError(500, err));
  }
};
