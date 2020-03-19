const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const Votings = require('../models/Votings');

router.get('/', async (req, res, next) => {
  let votingsData = await Votings.find();
  console.log(votingsData);
  res.render('main', {
    title: '메인 페이지',
    votingsData
  });
});

router.put('/', async (req, res, next) => {
  console.log(req.body);
  await Votings.updateOne({ expiration_date: req.body.date }, { progress: false })
  res.json({ result: 'ok' })
});

router.delete('/', (req, res, next) => {
  Votings.find((err, votingsData) => {
    res.render('main', {
      title: '메인 페이지',
      votingsData
    });
  });
});

router.get('/my-votings', isLoggedIn, async (req, res, next) => {
  const myVotingList = await Votings.find({ writerId: req.user._id })
  res.render('myVotings', {
    title: '내 투표보기',
    myVotingList
  });
});

module.exports = router;
