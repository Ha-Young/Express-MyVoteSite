const express = require('express');
const router = express.Router();
const voteController = require('../controllers/vote.controller');
const { checkAuthenticated } = require('../middlewares/auth');
const User = require('../models/User');
const Vote = require('../models/Vote');

/* GET home page. */
router.get('/', require('./home'));
router.get('/dashboard', async (req, res, next) => {
  const votes = await Vote.find({}).lean();
  if (!req.user) {
    req.user = {
      name: "kim",
      avatarUrl: "https://storage.jewheart.com/content/users/avatars/1606/avatar_1606_500.jpg?1558623487"
    }
  }
  res.locals.user = req.user;
  res.locals.votes = votes;
  res.render('dashboard');
})
router.get('/myvotes', checkAuthenticated, voteController.renderMyVote);

router.use('/home', require('./home'));
router.use('/auth', require('./auth'));
router.use('/vote', require('./vote'));

module.exports = router;
