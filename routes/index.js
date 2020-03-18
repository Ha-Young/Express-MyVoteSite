const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const Votings = require('../models/Votings');

router.get('/', (req, res, next) => {
  Votings.find((err, votingsData) => {
    res.render('main', {
      title: '메인 페이지',
      votingsData
    });
  });
});


router.get('/my-votings', isLoggedIn, async (req, res, next) => {
  const myVotingList =  await Votings.find({writerId: req.user._id })
  console.log('------test-------',myVotingList);
  res.render('myVotings', {
    title: '내 투표보기',
    myVotingList
  });
});

module.exports = router;
