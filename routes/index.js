const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const Votings = require('../models/Votings');

router.get('/', async (req, res, next) => {
  const votingsData = await Votings.find();
  res.render('main', {
    title: '투표 리스트',
    votingsData
  });
});

router.put('/', async (req, res, next) => {
  await Votings.updateOne(
    { expiration_date_string: req.body.date },
    { progress: false }
  );
  res.json({ result: 'ok' });
});

router.get('/my-votings', isLoggedIn, async (req, res, next) => {
  const myVotingList = await Votings.find({ writerId: req.user._id });
  res.render('myVotings', {
    title: '내 투표보기',
    myVotingList
  });
});

module.exports = router;
