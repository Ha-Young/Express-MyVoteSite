const express = require('express');
const router = express.Router();
const Voting = require('../models/Voting');
const User = require('../models/User');
const { koLocale } = require('date-fns/locale/ko');
const format = require('date-fns/format');
const { isLoggedIn } = require('./middlewares');
const {
  makeOptionObject,
  checkWasVoting,
  makeOptionsData
} = require('../public/javascripts/utils');

router.get('/', isLoggedIn, async function(req, res, next) {
  const votings = await Voting.find({ created_by_id: req.user._id });
  res.render('userVoting', {
    votings,
    creator: req.user.nickname
  });
});

router.post('/new', isLoggedIn, async function(req, res, next) {
  const newVoting = {
    title: req.body.title,
    created_by_id: req.user._id,
    complete_at: req.body.date,
    is_completed: false,
    options: makeOptionObject(req.body.options)
  };

  await Voting.create(newVoting);
  res.redirect('/');
});

router.get('/new', isLoggedIn, function(req, res, next) {
  const date = format(new Date(), 'yyyy-MM-dd', { locale: koLocale });
  const time = format(new Date(), 'hh:mm', { locale: koLocale });
  const today = date + 'T' + time;
  res.render('createVoting', { date: today });
});

router.get('/success', isLoggedIn, function(req, res, next) {
  res.render('success');
});

router.get('/error', function(req, res, next) {
  res.render('error', { message: '투표생성실패' });
});

router.get('/result/:voting_id', isLoggedIn, async function(req, res, next) {
  console.log(req.params.voting_id);
  const voting = await Voting.findOne({ _id: req.params.voting_id });
  const options = makeOptionsData(voting.options);
  res.render('votingChart', { data: options });
});

router.get('/:voting_id', isLoggedIn, async function(req, res, next) {
  const voting = await Voting.findOne({ _id: req.params.voting_id });
  const user = await User.findOne({ _id: voting.created_by_id });
  let wasVoting = checkWasVoting(voting.options, req.user._id);
  const todayDate = new Date().toISOString();

  res.render('voting', {
    title: voting.title,
    author: user.nickname,
    options: voting.options,
    path: req.params.voting_id,
    wasVoting: wasVoting,
    isAuthor:
      JSON.stringify(req.user._id) === JSON.stringify(voting.created_by_id),
    wasCompleted: todayDate > voting.complete_at.toISOString()
  });
});

router.post('/:voting_id', isLoggedIn, async function(req, res, next) {
  const votingID = req.params.voting_id;
  const optionIdx = `options.${req.body.option}.chosen_by`;
  const selectUser = req.user._id;
  try {
    await Voting.findByIdAndUpdate(votingID, {
      $addToSet: { [optionIdx]: selectUser }
    });
    res.redirect('/votings/success');
  } catch {
    res.redirect('/votings/error');
  }
});

router.delete('/:voting_id', isLoggedIn, async function(req, res, next) {
  await Voting.findByIdAndDelete(req.params.voting_id);
  res.redirect('/');
});

module.exports = router;
