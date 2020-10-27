const express = require('express');
const User = require('../models/User');
const router = express.Router();
const passport = require('passport');


router.get('/', (req, res, next) => {
  res.status(200).render('login');
});

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      next(err);

      return;
    }

    if (!user) {
      res.status(200).render('wrongIdOrPw');

      return;
    }

    req.login(user, err => {
      if (err) {
        next(err);

        return;
      }

      req.session.userId = user._id;
      res.redirect('/');
    });

  })(req, res, next);
});

module.exports = router;
