const express = require('express');
const router = express.Router();
const authentication = require('./middlewares/authentication');
const Vote = require('../models/Vote');
const dateFormat = require('dateformat');

/* GET home page. */

router.get('/', authentication.ensureLoggedIn, async function(req, res, next) {
  try {
    const votes = await Vote.find().populate('creator_id', 'name');
    const now = new Date();
    const isInProgress = votes.map(vote => vote.end_date > now);
    const times = votes.map(vote => dateFormat(vote.end_date, 'yy-mm-dd hTT'));

    res.render('main', { votes, isInProgress, times, myVote: false });

  } catch(err) {
    next(err);
  }
});

router.get('/login', function(req, res) {
  res.render('login', { message: req.flash('error') });
});

router.get('/join', function(req, res) {
  res.render('join', { message: null, err: null });
});

module.exports = router;
