const createError = require('http-errors');

const User = require('../models/User');
const Vote = require('../models/Vote');
const generateDateTimeString = require('../utils/generateDateTimeString');

exports.getHome = async (req, res, next) => {
  try {
    const votes = await Vote.find().populate('author', 'nickname').lean();
    votes.forEach(vote => {
      vote.expiration_date = generateDateTimeString(vote.expiration_date);
    });

    res.render('index', {
      user: req.user,
      votes,
    });
  } catch (err) {
    next(createError(err));
  }
};

exports.getMyVotes = (req, res) => {
  const title = 'Sign Up';
  const infoMessages = req.flash('info');
  const message = req.flash('error');

  res.render('myVotings', {
    title,
    infoMessages,
    message
  });
};

