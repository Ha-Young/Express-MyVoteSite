const express = require('express');
const router = express.Router();

const Voting = require('../models/Voting');

router.get('/', async (req, res, next) => {
  console.log('gha홈', res.locals)
  const allVotings = await Voting.find();
  res.render('index', {
    allVotings,
    currentDate: new Date().getTime(),
    user: req.user
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/my-votings', async (req, res) => {
  const userId = req.user._id;

  try {
    const myVotingList = await Voting.find({ authorId: userId });
    const currentDate = new Date().getTime();

    res.render('myVotings', {
      myVotingList, currentDate
    });
  } catch (error) {
    next(error)
  }
});

module.exports = router;
