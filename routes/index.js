const express = require('express');
const router = express.Router();
const isLoggedIn = require('./middleware/isLoggedIn');
const votingsController = require('../controllers/votings.controller');
const userController = require('../controllers/user.controller');
const wrapAsync = require('../utils/wrapAsync');

router.get('/', wrapAsync(votingsController.voteGetAll));

router.get('/logout', isLoggedIn, (req, res, next) => {
  try {
    res.status(200).render('logout');
  } catch (e) {
    next(e);
  }
});
router.get('/logout/callback', isLoggedIn, userController.logout);

router.get('/signup', (req, res, next) => {
  res.render('signup');
});
router.post('/signup', wrapAsync(userController.signup));

router.get('/signout', isLoggedIn, (req, res, next) => {
  try {
    res.status(200).render('signout');
  } catch (e) {
    next(e);
  }
});
router.get('/signout/callback', isLoggedIn, wrapAsync(userController.signout));

router.get('/my-votings/:id', isLoggedIn, wrapAsync(votingsController.getMyVoteList));

module.exports = router;
