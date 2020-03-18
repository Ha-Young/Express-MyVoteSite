const express = require('express');
const router = express.Router();

const Voting = require('../models/Voting');

router.get('/new', (req, res, next) => {
  //FIXME: 더 효율적인 방법으로 수정하기, 모달
  if (req.user) {
    res.render('newVoting');
  }
});

router.post('/new', async (req, res, next) => {
  const votingInfoKey = Object.keys(req.body);
  const isEmptyValueCheck = votingInfoKey.every(key => req.body[key] !== '');
  
  //FIXME: 빈값 발견시 모달 띄우기
  if (isEmptyValueCheck) {
    const itemsKey = votingInfoKey.slice(1, votingInfoKey.length - 1);
    const items = itemsKey.map(key => req.body[key]);
    const title = req.body.title;
    const endDate = req.body.endDate;

    new Voting({
      title,
      items,
      endDate,
      author: req.user.email
    }).save();
  }

  // 유효성 검사
  // 타이틀 ,시간 , 투표항목 다수 나눠야함
  // 디비에 저장
  // 홈에 저장된 모든 투표 정보투표 정보 넘겨주기 
  
  // const allVotings = await Voting.find();
  // console.log(allVotings)
  // res.locals.votings = allVotings;
  res.redirect('/');
});

module.exports = router;
