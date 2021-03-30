const Voting = require('../models/Voting');

exports.getVotings = async function (req, res, next) {

  const votings = await Voting.find().lean().populate('author');

  res.render('home', { votings });
};
