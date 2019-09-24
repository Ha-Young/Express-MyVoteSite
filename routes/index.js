const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./middlewares');
const Vote = require('../models/Vote');

/* GET home page. */
router.get('/', isLoggedIn, (req, res, next) => {
  try {
    Vote.find({}, function (err, votes) {
      res.render('index', {
        title: 'voting',
        votes
      });
    });
  } catch (err) {
    next();
  }
});

module.exports = router;
