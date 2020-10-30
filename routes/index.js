const express = require('express');
const passport = require('passport');
const Voting = require('../models/Voting');

const router = express.Router();
const { validateLogin } = require('./middlewares/validation');
/* GET home page. */
router.get('/', async (req, res, next) => {
  let allVotings;
  try {
    allVotings = await Voting.find({});

    for (let index = 0; index < allVotings.length; index++) {
      if (allVotings[index].verifyExpireDate()) {
        allVotings[index].isExpire = true;
        await allVotings[index].save();
      }
    }
  } catch (err) {
    return next(err);
  }

  return res.render('index', { votingList: allVotings, islogined: !!req.user });
});

router.get('/login', (req, res, next) => res.render('login', { preUrl: null }));

router.get('/logout', (req, res, next) => {
  req.logOut();
  res.redirect('/login');
});

router.get('/my-votings', async (req, res, next) => {
  const myVotingList = await Voting.find({ profileId: req.user.profileId });
  return res.render('myVotings', { votingList: myVotingList, userName: req.user.userName });
});

router.get('/login', (req, res, next) => res.render('login'));

router.get('/auth/github',
  passport.authenticate('github'), (req, res, next) => {
  });

router.get('/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: '/',
  }));
module.exports = router;
