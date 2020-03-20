const Vote = require('../models/Vote');
const mongoose = require('mongoose');

const findVoteById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next({
        status: 400,
        message: '잘못된 경로입니다'
      });
    }

    const vote = await Vote.findById(req.params.id);

    if (!vote) {
      console.log('there is no vote');
      return next({
        ...error,
        status: 404,
        message: 'Not Found'
      });
    }

    res.locals.vote = vote;
    next();
  } catch (error) {
    next({
      status: 500,
      message: 'Internal Server Error'
    });
  }
};

const findVote = async (req, res, next) => {
  try {
    const votesInProgress = await Vote.find({ in_progress: true });
    const votesEnds = await Vote.find({ in_progress: false });

    res.locals.votes = [votesInProgress, votesEnds];
    next();
  } catch (error) {
    next({
      status: 500,
      message: 'Internal Server Error'
    });
  }
};

const findVoteByOwner = async (req, res, next) => {
  try {
    const { user } = res.locals;
    const votesInProgress = await Vote.find({ "owner._id": user._id, in_progress: true });
    const votesEnds = await Vote.find({ "owner._id": user._id, in_progress: false });
    
    res.locals.votes = [votesInProgress, votesEnds];
    next();
  } catch (error) {
    next({
      status: 500,
      message: 'Internal Server Error'
    });
  };
};

const updateVoteStatus = async (req, res, next) => {
  try {
    const votes = await Vote.find({ in_progress: true });

    votes.forEach(async vote => {
      const expired_date = vote.expired_date;

      if (expired_date < new Date()) {
        vote.in_progress = false;
        await Vote.findByIdAndUpdate(vote._id, { in_progress: false });
      }
    });

    next();
  } catch (error) {
    next({
      status: 500,
      message: 'Internal Server Error'
    });
  }
};

module.exports = {
  findVote,
  findVoteById,
  findVoteByOwner,
  updateVoteStatus
};

