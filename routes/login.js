const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
  res.render('login', { title: 'Express' });
});

router.post('/',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    const redirectTo = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectTo);
  }
);

module.exports = router;
