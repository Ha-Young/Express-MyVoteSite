const express = require('express');

const router = express.Router();
const passport = require('passport');
const createError = require('http-errors');

router.get('/', (req, res) => {
  const { url } = req;
  res.render('login', { url });
});

router.post('/', (req, res, next) => {
  const continueURL = req.query.continue;
  const successURL = continueURL || '/';

  passport.authenticate('local', (err, user, info) => {
    if (err) return next(createError(500, '일시적인 오류가 발생하였습니다.'));
    if (!user) return next(createError(400, info.message));

    req.logIn(user, err => {
      if (err) return next(createError(500, '일시적인 오류가 발생하였습니다.'));
      return res.redirect(successURL);
    });
  })(req, res, next);
});

module.exports = router;
