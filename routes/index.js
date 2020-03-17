const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const Votings = require('../models/Votings');

router.get('/', isLoggedIn, (req, res, next) => {
  Votings.find((err, votingsData) => {
    res.render('main', {
      title: '메인 페이지',
      votingsData
    });
  });
});


router.get('/my-votings', isLoggedIn, (req, res, next) => {
  res.render('myVotings', {
    title: '내 투표보기'
  });
});

module.exports = router;
