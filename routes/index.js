const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Vote = require('../models/Vote');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { validateUser } = require('./middleware/validation');
const { isAuthenticated } = require('./middleware/authentication');
const { convertDate } = require('../utils/utils');

router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    await Vote.find()
    .populate('user_id')
    .exec((err, votes) => {
      if (err) return handleError(err);

      const voteCollection = votes.map(vote => {
        vote.converted_date = convertDate(vote.expired_at);
        return vote;
      });

      return res.render('index', {
        userName: req.user.name,
        votes: voteCollection,
        loginMessage: req.flash('success')[0]
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
  failureFlash: true,
  successFlash: 'Welcome!'
}));

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/join', (req, res, next) => {
  res.render('join', { error: req.flash('error')[0] });
});

router.post('/join', validateUser, async (req, res, next) => {
  try {
    const {
      email,
      name,
      password
    } = req.body;

    const SALT_ROUNDS = 10;
    const hash = bcrypt.hashSync(password, SALT_ROUNDS);

    await new User({
      email,
      name,
      password: hash
    }).save();

    req.flash('joinMessage', "You've successfully signed up!");

    return res.redirect("/login");
  } catch (err) {
    console.error(err);

    const dbValidationError = err.errors.name || err.errors.password || err.errors.email;

    if (dbValidationError) {
      req.flash('error', dbValidationError.message);
    }

    return res.redirect("/join");
  }
});

module.exports = router;
