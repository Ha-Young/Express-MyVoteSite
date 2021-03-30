const Joi = require('joi');
const mongoose = require('mongoose');
const Voting = require('../models/Voting');
// TODO Joi 가져와서 create할때 validation하기.
// expiration_date 현시간 이후인지랑 options 2개 이상인지

exports.getNewVotingPage = async function (req, res, next) {
  res.render('newVoting')
}

exports.createNewVoting = async function (req, res, next) {
  const { title, options, expiration_date } = req.body;


  const votes = options.map((option) => {
    return { option, count: 0 };
  });

  await Voting.create({
    title,
    author: mongoose.Types.ObjectId(req.user),
    expiration_date,
    options,
    votes
  });

  res.redirect('/votings/new');
}
