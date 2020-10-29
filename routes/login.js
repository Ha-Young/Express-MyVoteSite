const express = require('express');
const User = require('../models/User');
const router = express.Router();
const passport = require('passport');


router.get('/', (req, res, next) => {
  res.status(200).render('login', {
    referer: req.headers.referer
  });
});

router.post('/', (req, res, next) => {
  console.log(req.body.referer);

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

      res.redirect(req.body.referer);
    });
  })(req, res, next);
});

module.exports = router;
