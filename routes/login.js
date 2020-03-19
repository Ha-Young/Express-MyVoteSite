const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
  console.log('로그인', req.session)
    res.render('login');
});

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      if (req.session.redirectUrl) {
        res.redirect(req.session.redirectUrl);
      } else {
        res.redirect('/');
      }
    });
  })(req, res, next);
});

module.exports = router;
