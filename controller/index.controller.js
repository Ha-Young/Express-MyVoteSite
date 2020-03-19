const createError = require('http-errors');
const Voting = require('../models/Voting');

exports.getAll = async (req, res, next) => {
  try {
    const votes = await Voting.find().populate('made');
    if (!votes) return next(createError(404, 'We can not find the votes for unknown reasons. Try again.'));
    const ongoingVotes = [];
    const completedVotes = [];
    votes.forEach((vote) => {
      const expirationDate = vote.expiration_date.toString();
      const voteInfo = {
        id: vote._id,
        title: vote.title,
        made: vote.made.email.split('@')[0],
        expiration: expirationDate.split('GMT')[0].slice(0, -4),
      };
      const isOngoing = new Date() < new Date(expirationDate);
      isOngoing ? ongoingVotes.push(voteInfo) : completedVotes.push(voteInfo);
    });
    
    if (!req.user) return res.render('index', { ongoingVotes, completedVotes });
    const user = req.user.email.split('@')[0];
    res.render('index', { user, ongoingVotes, completedVotes });
  } catch (err) {
    next(err);
  }
}

exports.getMyVotings = async (req, res, next) => {
  try {
    const votes = await Voting.find().populate('made');
    if (!votes) return next(createError(404, 'We can not find the votes for unknown reasons. Try again.'));
    const ongoingVotes = [];
    const completedVotes = [];
    votes.forEach((vote) => {
      if (req.user._id.equals(vote.made._id)) {
        const expirationDate = vote.expiration_date.toString();
        const voteInfo = {
          id: vote._id,
          title: vote.title,
          made: vote.made.email.split('@')[0],
          expiration: expirationDate.split('GMT')[0].slice(0, -4),
        };
        const isOngoing = new Date() < new Date(expirationDate);
        isOngoing ? ongoingVotes.push(voteInfo) : completedVotes.push(voteInfo);
      }
    });
    if(!req.user) return res.render('index', { ongoingVotes, completedVotes });
    const user = req.user.email.split('@')[0];
    res.render('index', { user, ongoingVotes, completedVotes });
  } catch (err) {
    next(err);
  }
}
