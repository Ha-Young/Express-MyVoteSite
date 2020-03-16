const express = require('express');
const passport = require('passport');

const errors = require('../lib/errors');

const router = express.Router();

router.get('/', (req, res, next) => res.render('login'));

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log('err', err)
    console.log('user', user)
    console.log('info', info);
    if (err) {
      return next(new errors.InvalidUserInfo(err.message));
    }

    if (!user) {
      return res.redirect('/login');
    }

    req.logIn(user, err => {
      if (err) {
        return next(new errors.LoginError(err.message));
      }

      return res.redirect('/');
    });
  })(req, res, next);
});

module.exports = router;
