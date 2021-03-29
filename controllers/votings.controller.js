const Voting = require('../models/Voting');

exports.getNewVotingPage = async function (req, res, next) {
  res.render('newVoting')
}

exports.createNewVoting = async function (req, res, next) {
  console.log(req.body)
}
