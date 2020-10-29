const express = require('express');
const router = express.Router();
const passport = require('passport');
const Voting = require('../models/Voting');
const checkAuthenticated = require('./middlewares/autorization');

router.get('/', async function (req, res) {
  let username = undefined;
  let votingList = undefined;
  if (req.user) {
    username = req.user.username;
  }

  try {
    votingList = await Voting.find();
  } catch (err) {
    next(err);
  }

  res.render('index', { username, votingList });
});

router.get('/my-votings', checkAuthenticated, async function (req, res) {
  let myAgenda = undefined;
  const username = req.user.username;

  try {
    myAgenda = await Voting.find({ author: req.user.email }).exec();
    console.log("MyAgenda", myAgenda);
  } catch (err) {
    console.log('error loading my agenda')
  }

  res.render('myAgenda', { username, myAgenda })
})

router.get('/login', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    if (req.session.lastUrl) {
      res.redirect(req.session.lastUrl);
    } else {
      res.redirect('/');
    }
  }
);

router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    next(err);
  });
  res.redirect('/');
});

module.exports = router;
