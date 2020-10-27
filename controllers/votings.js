const VIEWS = require('../constants/views');
const { convertToVotingObject } = require('../util/date');

const Voting = require('../models/Voting');

exports.getAll = (req, res, next) => {
  res.render(VIEWS.INDEX, { title: 'Main' });
};

exports.getAllMyVotings = (req, res, next) => {
  res.render(VIEWS.INDEX, { title: 'getAllMyVotings' });
};

exports.getNewVoting = (req, res, next) => {
  res.render(VIEWS.NEW, { title: 'Create New Voting' });
};

exports.postNewVoting = async (req, res, next) => {
  const {
    user: { _id },
    body: userInputs,
  } = req;

  try {
    const newVoting = convertToVotingObject(_id, userInputs);
    await Voting.create(newVoting);

    res.redirect('/');
  } catch (error) {
    next(error);
  }
};

exports.getVoting = (req, res, next) => {};

exports.postVoting = (req, res, next) => {};

exports.postVotingSuccess = (req, res, next) => {};

exports.postVotingError = (req, res, next) => {};
