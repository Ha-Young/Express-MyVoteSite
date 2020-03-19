const express = require('express');
const passport = require('passport');
const router = express.Router();

const authController = require('./controllers/auth.controller');

router.get('/login', authController.renderLogin);

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failWithError: true,
}), authController.authAndRedirect);

router.get('/logout', authController.logOut);

module.exports = router;
