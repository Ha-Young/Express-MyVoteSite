const express = require('express');
const router = express.Router();
const passport = require('passport');

const { validator } = require('../middlewares/validator');
const { authorization } = require('../middlewares/authorization');
const signupController = require('../controllers/signup.Controller');
const errors = require('../helpers/error');

const Vote = require('../models/Vote');

router.get('/', async (req, res, next) => {
  try {
    const today = new Date(Date.now());

    await Vote.updateMany(
      { expirationDate: { $lte: today }},
      { isExpired: true }
    );

    const votes = await Vote.find();
    res.render('index', { votes });
  } catch (error) {
    next(new errors.GeneralError(error));
  }
});

router.get('/login', authorization, (req, res, next) => {
  res.render('login', { message: null });
});


router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, message) {
    if (err) {
      return next(errors.GeneralError(err));
    }
    if (!user) {
      return res.render('login', { message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(errors.ValidatorError(err));
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session.save(() => {
    res.redirect('/');
  });
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', validator, signupController.register, (req, res, next) => {
    res.redirect('/login');
  }
);

module.exports = router;
