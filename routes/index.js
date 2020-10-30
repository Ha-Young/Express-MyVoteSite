const express = require('express');
const router = express.Router();
const passport = require('passport');
const checkAuthenticated = require('./middlewares/autorization');
const { getAllVotings, getMyVoting } = require('./middlewares/votings');
const indexController = require('./controllers/index.controller');

router.get('/', getAllVotings, indexController.getAll);
router.get('/my-votings', checkAuthenticated, getMyVoting, indexController.getMyVoting);
router.get('/login', indexController.login);
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  indexController.loginCallback
);
router.get('/logout', indexController.logout);

module.exports = router;
