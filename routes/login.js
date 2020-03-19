const express = require('express');
const router = express.Router();
const passport = require('passport');

// const loginControllers = require('./controllers/login.controllers');

const authenticate = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
});

router.get('/', (req, res, next) => res.render('login'));
router.post('/', authenticate);

module.exports = router;
