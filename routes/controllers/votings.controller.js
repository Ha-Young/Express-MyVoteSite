const Vote = require('../../models/vote');

exports.get = (req, res, next) => {
  res.render('votingCreate');
};

exports.post = (req, res, next) => {
  const data = req.body;

  res.json(data);
};
