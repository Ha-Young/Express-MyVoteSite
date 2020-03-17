const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const votingsData = require('../models/sampleVotingsData.json')

router.get('/', isLoggedIn, (req, res, next) => {
  res.render('main', {
    title: '메인 페이지',
    votingsData
  });
});

router.get('/votings/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('---------id-------', id);
  res.send('투표 페이지 이동');
});

router.get('/votings/new', isLoggedIn, (req, res, next) => {
  res.render('newVoting', {
    title: '투표 생성하기'
  });
});

router.get('/my-votings', isLoggedIn, (req, res, next) => {
  res.render('myVotings', {
    title: '내 투표보기'
  });
});

module.exports = router;
