const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const getPollsAndTimeString = require('../lib/getPollsAndTimeString');

router.get('/', async (req, res, next) => {
  const data = await getPollsAndTimeString();
  const { polls } = data;
  const { timeString } = data;

  if (req.isAuthenticated()) {
    res.render('index', { hasLoggedIn: true, polls, timeString });
  } else {
    res.render('index', { hasLoggedIn: false, polls, timeString });
  }
});

module.exports = router;
