const createError = require('http-errors');

exports.getAll = (req, res, next) => {
  res.send('respond with a resource');
};

exports.showForm = (req, res) => {
  res.render('partial/votingForm');
};

exports.create = async (req, res, next) => {

};
