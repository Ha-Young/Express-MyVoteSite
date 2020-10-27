const VIEWS = require('../constants/views');

exports.getAll = (req, res, next) => {
  res.render(VIEWS.INDEX, { title: 'Main' });
};

exports.getAllMyVotings = (req, res, next) => {
  res.render(VIEWS.INDEX, { title: 'getAllMyVotings' });
};

exports.getVoting = (req, res, next) => {};

exports.postVoting = (req, res, next) => {};

exports.getNewVoting = (req, res, next) => {
  console.log('getNewVoting', VIEWS.NEW);
  res.render(VIEWS.NEW, { title: 'Create New Voting' });
};

exports.postNewVoting = (req, res, next) => {};

exports.postVotingSuccess = (req, res, next) => {};

exports.postVotingError = (req, res, next) => {};
