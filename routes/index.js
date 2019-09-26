const express = require('express');
const router = express.Router();
const authentication = require('./middlewares/authentication');
const Vote = require('../models/Vote');
const dateFormat = require('dateformat');

/* GET home page. */
router.get('/', authentication.ensureLoggedIn, async(req, res, next) => {
  try {
    const votes = await Vote.find();
    const now = new Date();
    const isInProgress = votes.map(vote => vote.end_date > now);
    const times = votes.map(vote => dateFormat(vote.end_date, 'yy-mm-dd hTT'));

    res.render('index', { votes, isInProgress, times, myVote: false });

  } catch(err) {
    next(err);
  }
});

module.exports = router;
