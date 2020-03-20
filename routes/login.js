const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
  const url = req.url;
  res.render('login', { url });
});

router.post('/', (req, res, next) => {
  const query = req.query.continue;
  const successRedirect = query ? query : '/';

  passport.authenticate('local', {
    successRedirect,
    failureRedirect: '/login'
  })(req, res, next);
});

module.exports = router;
