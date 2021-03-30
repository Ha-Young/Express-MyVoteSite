const Joi = require('joi');
const mongoose = require('mongoose');
const Voting = require('../models/Voting');
// TODO Joi 가져와서 create할때 validation하기.
// expiration_date 현시간 이후인지랑 options 2개 이상인지

exports.getNewVotingPage = async function (req, res, next) {
  res.render('newVoting');
}

exports.createVoting = async function (req, res, next) {
  const { title, options, expiration_date } = req.body;
  const votes = options.map((option) => {
    return { option, count: 0 };
  });

  await Voting.create({
    title,
    author: req.user,
    expiration_date,
    options,
    votes
  });

  res.redirect('/votings/new');
}

exports.getVotingDetailPage = async function (req, res, next) {
  const votingId = req.params['voting_id'];

  const voting = await Voting.findById(votingId).populate('author');
  console.log(voting)
  res.render('votingDetail', { voting })
}

exports.updateVotes = async function (req, res, next) {
  const votingId = parseInt(req.params['voting_id']);
  const voting = await Voting.findById(votingId);

  res.render('votingDetail', { voting })
}
