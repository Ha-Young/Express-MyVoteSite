const Vote = require('../models/Vote');

exports.getVotes = async function (res, res, next) {
  const votes = await Vote.find();

  res.render('home', { votes });
}
