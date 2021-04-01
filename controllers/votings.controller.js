const createError = require('http-errors');

const Vote = require('../models/Vote');
const APIFeatures = require('../utils/APIFeatures');

exports.getVotingPage = async (req, res, next) => {
  try {
    const features = new APIFeatures(
      Vote.findById(req.params.id)
      , req.query
    ).populate();
    const vote = await features.query.lean();

    if (!vote) {
      return next(createError(400));
    }

    const isAuthor = req.user?.email === vote.author.email;
    const isVoted = vote.options.reduce((acc, curr) => {
      return acc || !!curr.voters.some(voter => voter.email === req.user?.email);
    }, false);

    res.render('voting', {
      user: req.user,
      isAuthor,
      isVoted,
      vote
    });
  } catch (err) {
    next(err);
  }
};

exports.voting = async (req, res, next) => {
  try {
    await Vote.updateOne(
      {
        _id: req.params.id,
        "options.option": req.body.option,
      },
      {
        $push: {
          "options.$.voters": req.user._id,
        },
      }
    );

    res.redirect(`/votings/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

exports.deleteVote = async (req, res, next) => {
  try {
    await Vote.findByIdAndDelete(req.params.id);
    res.json(204);
  } catch (err) {
    next(err);
  }
};

exports.getVotingForm = (req, res) => {
  res.json();
};

exports.createVote = async (req, res, next) => {
  try {

  } catch (err) {
    next(createError(500));
  }
};
