const express = require('express');
const passport = require('passport');
const authController = require('./controllers/auth.controller');
const rateLimit = require('./middlewares/blockToManyRequests');
const router = express.Router();

router.get(
  '/login',
  rateLimit.blockTooManyRequests,
  authController.renderLogin
);

router.post(
  '/login',
  rateLimit.blockManyPasswordFailure,
  passport.authenticate('local', {
    failureRedirect: '/login',
    failWithError: true,
  }),
  authController.authAndRedirect
);

router.get('/logout', rateLimit.blockTooManyRequests, authController.logOut);

module.exports = router;
