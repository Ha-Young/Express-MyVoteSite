const VIEWS = require('../constants/views');

exports.getAll = (req, res, next) => {
  res.render(VIEWS.INDEX, { title: 'INDEX' });
};

exports.getAllMyVotings = (req, res, next) => {};

exports.getVoting = (req, res, next) => {};

exports.postVoting = (req, res, next) => {};

exports.getNewVoting = (req, res, next) => {};

exports.postNewVoting = (req, res, next) => {};

exports.postVotingSuccess = (req, res, next) => {};

exports.postVotingError = (req, res, next) => {};
