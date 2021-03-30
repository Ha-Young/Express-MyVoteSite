const createError = require('http-errors');

const Vote = require('../models/Vote');

exports.getVote = (req, res) => {

};

exports.getVotingForm = (req, res) => {

};

exports.createVote = async (req, res, next) => {
  try {

  } catch (err) {
    next(createError(500));
  }
};

exports.deleteVote(req, res, next) => {

};
