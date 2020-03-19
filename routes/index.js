const express = require('express');
const router = express.Router();

const Voting = require('../models/Voting');

router.get('/', async (req, res, next) => {
  const allVotings = await Voting.find();
  res.render('index', {
    //FIXME: 기간 만료, 진행중 계산해서 ejs에 넘겨주기 
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

router.get('/my-votings', (req, res) => {
  const allVotings = await Voting.find();
  const userId = req.user._id;
  const myVotings = []
  const otherVotings = []
  //여기서 내 투표, 전체 투표 걸러서 주기 
  //해당 유저값 제외후 검색 ? 

  res.render('myVotings', {
    allVotings,
    userId
  });
});

module.exports = router;
