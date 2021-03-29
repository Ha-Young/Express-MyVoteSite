const express = require('express');
const passport = require('passport');
const router = express.Router();

/* GET auth page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: "login success"});
});

router.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');
  });

module.exports = router;
