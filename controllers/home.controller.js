const Voting = require('../models/Voting');

exports.getVotings = async function (req, res, next) {

  const votings = await Voting.find();

  res.render('home', { votings });
}
