const createError = require('http-errors');
const mongoose = require('mongoose');

const Vote = require('../models/Vote');

exports.getVotingPage = async (req, res, next) => {
  try {
    const vote = await Vote
      .findById({ _id: mongoose.Types.ObjectId(req.params.id) })
      ?.populate('author', 'nickname email')
      ?.lean();

    if (!vote) {
      return next(createError(400));
    }

    const isAuthor = req.user?.email === vote.author.email;
    const isExpired = new Date() >= new Date(vote.expiration_date);

    res.render('voting', {
      user: req.user,
      isAuthor,
      isExpired,
      vote
    });
  } catch (err) {
    next(err);
  }
};

exports.voting = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
};

exports.getVotingForm = (req, res) => {

};

exports.createVote = async (req, res, next) => {
  try {

  } catch (err) {
    next(createError(500));
  }
};

exports.deleteVote = async (req, res, next) => {

};
