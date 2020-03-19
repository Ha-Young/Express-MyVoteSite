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
  res.redirect('/');
});

module.exports = router;
