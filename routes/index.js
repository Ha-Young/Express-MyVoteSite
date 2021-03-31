const express = require('express');
const router = express.Router();
const isLoggedIn = require('./middleware/isLoggedIn');
const votingsController = require('../routes/controllers/votings.controller');
const userController = require('../routes/controllers/user.controller');

/* GET home page. */
router.get('/', votingsController.voteGetAll);

router.get('/logout', isLoggedIn, (req, res, next) => {
  res.render('logout');
});
router.get('/logout/callback', isLoggedIn, userController.logout);

router.get('/signup', function(req, res, next) {
  res.render('signup');
});
router.post('/signup', userController.signup);

router.get('/my-votings', isLoggedIn, userController.myVotingList);

module.exports = router;
