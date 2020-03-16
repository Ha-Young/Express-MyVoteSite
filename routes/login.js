const express = require('express');
const passport = require('passport');

const errors = require('../lib/errors');

const router = express.Router();

router.get('/', (req, res, next) => res.render('login'));

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, validUser, authFailureMessage) => {
    // console.log('err', err)
    // console.log('validUser', validUser)
    // console.log('authFailureMessage', authFailureMessage);
    if (err) {
      return next(new errors.GeneralError(err.message));
    }

    if (!validUser) {
      return next(new errors.InvalidLoginInputError(authFailureMessage));
    }

    req.logIn(validUser, err => {
      if (err) {
        return next(new errors.LoginError(err.message));
      }

      return res.redirect('/');
    });
  })(req, res, next);
});

module.exports = router;
