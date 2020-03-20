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

router.get('/my-votings', async (req, res) => {
  const userId = req.user._id;
  const allVotings = await Voting.find();
  const myVotings = [];
  const otherVotings = [];

  allVotings.forEach(voting => {
    const isMyVoitng = String(voting.authorId) === userId;
    const votingEndDate = new Date(voting.endDate).getTime();
    const currentDate = new Date().getTime();

    //FIXME: 각 투표에 속성 추가 해야함
    if (votingEndDate >= currentDate) { 
      voting.status = true;
      voting.myVoting = true;
      voting.class = 'myVoting';
    } else {
      voting.status = false;
      voting.myVoting = false;
      voting.class = null;
    }

    if (isMyVoitng) {
      myVotings.push(voting);
    } else {
      otherVotings.push(voting);
    }
  });
  
  res.render('myVotings', {
    votings: [...myVotings, ...otherVotings],
  });
});

module.exports = router;
