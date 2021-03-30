const createError = require('http-errors');

const User = require('../models/User');
const Vote = require('../models/Vote');

exports.getHome = (req, res) => {
  res.render('index');
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

