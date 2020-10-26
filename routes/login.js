const express = require('express');
const router = express.Router();
const passport = require('../src/passport');

router.get('/', (req, res, next) => {
  res.status(200).render('login');
});

router.post('/',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
  }), (req, res, next) => {
    res.status(302).redirect('/');
  }
);

module.exports = router;
