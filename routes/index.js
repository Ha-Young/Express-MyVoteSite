const express = require('express');
const router = express.Router();
const passport = require('passport');

const { authorization } = require('../middlewares/authorization');
const { validator } = require('../middlewares/validator');
const signupController = require('../controllers/signup.Controller');
const errors = require('../helpers/error');

const Vote = require('../models/Vote');

router.get('/', async (req, res, next) => {
  const today = new Date(Date.now());

  try {
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

router.get('/login', authorization, (req, res) => {
  res.render('login', { message: null });
});


router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, message) {
    if (err) {
      next(errors.GeneralError(err));
    }
    if (!user) {
      return res.render('login', { message });
    }
    req.logIn(user, (error) => {
      if (error) {
        next(errors.ValidatorError(error));
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', (req, res, next) => {
  try {
    req.logout();
    req.session.save(() => {
      res.redirect('/');
    });
  } catch (error) {
    next(errors.GeneralError(error));
  }
});

router.get('/signup', (req, res) => {
  res.render('signup', { invalidErrors: null });
});

router.post('/signup', validator, signupController.register, (req, res) => {
    res.redirect('/login');
  }
);

module.exports = router;
