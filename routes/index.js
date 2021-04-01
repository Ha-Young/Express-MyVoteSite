const express = require('express');
const router = express.Router();
const isLoggedIn = require('./middleware/isLoggedIn');
const votingsController = require('../controllers/votings.controller');
const userController = require('../controllers/user.controller');

/* GET home page. */
router.get('/', votingsController.voteGetAll);

router.get('/logout', isLoggedIn, (req, res, next) => {
  res.render('logout');
});
router.get('/logout/callback', isLoggedIn, userController.logout);

router.get('/signup', (req, res, next) => {
  res.render('signup');
});
router.post('/signup', userController.signup);

router.get('/signout', isLoggedIn, (req, res, next) => {
  res.render('signout');
});
router.get('/signout/callback', isLoggedIn, userController.signout);

router.get('/my-votings/:id', isLoggedIn, votingsController.getMyVoteList);

module.exports = router;
