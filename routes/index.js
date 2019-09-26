const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Vote = require('../models/Vote');
const passport = require('passport');
const { validateUser } = require('./middleware/validation');
const { isAuthenticated } = require('./middleware/authentication');
const { convertDate } = require('../utils/utils');

router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    await Vote.find()
    .populate('user_id')
    .exec((err, votes) => {
      if (err) {
        console.error(err);
        return next(err);
      };

      const voteCollection = votes.map(vote => {
        vote.converted_date = convertDate(vote.expired_at);
        return vote;
      });

      return res.render('index', {
        userName: req.user.name,
        votes: voteCollection,
        message: req.flash('success')[0]
      });
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/login', (req, res, next) => {
  res.render('login', {
    message: req.flash('joinMessage')[0] || req.flash('error')[0]
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect : '/',
  failureRedirect: '/login',
  successFlash: 'Welcome!',
  failureFlash: true
}));

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/join', (req, res, next) => {
  res.render('join', { message: req.flash('validationError')[0] });
});

router.post('/join', validateUser, async (req, res, next) => {
  try {
    await new User(req.body).save();

    req.flash('joinMessage', 'Sign up complete!');

    return res.redirect("/login");
  } catch (err) {
    console.error(err);

    const dbValidationError = err.errors.name || err.errors.password || err.errors.email;

    if (dbValidationError) {
      req.flash('validationError', dbValidationError.message);
    }

    return res.redirect("/join");
  }
});

module.exports = router;
