const express = require('express');
const passport = require('passport');
const changeDateForm = require('../utils/changeDateForm');
const UserService = require('../../services/UserService');
const VoteService = require('../../services/VoteService');
const { isLoggedIn, isNotLoggedIn, setLocals } = require('../middlewares/middlewares');

const router = express.Router();

router.get('/', setLocals, async (req, res, next) => {
  try {
    const items = await VoteService.getInProgress();
    changeDateForm(items);

    return res.render('home', { voteItems: items });
  } catch (error) {
    next(error);
  }
});
router.get('/expired', setLocals, async (req, res, next) => {
  try {
    const items = await VoteService.getExpired();
    changeDateForm(items);

    return res.render('expired', { voteItems: items });
  } catch (error) {
    return next(error);
  }
});
router.get('/my-votings', isLoggedIn, setLocals, async (req, res, next) => {
  try {
    const userId = req.user;
    const items = await VoteService.getMyVoting(userId);
    changeDateForm(items);

    return res.render('myVotings', { voteItems: items });
  } catch (error) {
    return next(error);
  }
});
router.get('/signup', isNotLoggedIn, (req, res, next) => {
  return res.render('signup');
});
router.post('/signup', isNotLoggedIn, async (req, res, next) => {
  try {
    const user = req.body;
    const result = await UserService.signup(user);

    if (result) return res.json({ redirect: '/login' });

    return res.json({ signupResult: 'Email Already Exist' });
  } catch (error) {
    return next(error);
  }
});
router.get('/login', isNotLoggedIn, (req, res, next) => {
  const { callbackUrl } = req.query;
  return res.render('login', { callbackUrl });
});
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  const { callbackUrl } = req.body;

  if (!callbackUrl) return res.redirect(callbackUrl);
  return res.redirect('/');
});
router.get('/logout', isLoggedIn, (req, res, next) => {
  UserService.logout();
});

module.exports = router;
