const express = require('express');
const router = express.Router();

const Voting = require('../models/Voting');

router.get('/new', (req, res, next) => {
    res.render('newVoting');
});

router.post('/new', async (req, res, next) => {
  const { title, items, endDate } = req.body;
  /*
  {
  title: 'qq',
  items: [ 'q1', 'q2' ],
  endDate: '2020-03-19T14:02'
  }
  */
  const votingInfo = Object.keys(req.body);
  const isEmptyValueCheck = votingInfo.every(item => req.body[item].length !== 0);

  //FIXME: 빈값 발견시 모달 띄우기
  if (isEmptyValueCheck) {
    const itemList = [];
    items.forEach(item => itemList.push({ name: item, count: 0 }));

    new Voting({
      title,
      items: itemList,
      endDate,
      author: req.user.email,
      solvedUser: []
    }).save();
  }
  res.redirect('/');
});

router.get('/:voting_id', async (req, res) => {
  const { voting_id: id } = req.params;
  const voting = await Voting.findOne({ _id: id });
  const votingEndDate = new Date(voting.endDate).getTime();
  const currentDate = new Date().getTime();
  let isAuthor;

  if(req.user) {
    isAuthor = req.user.email === voting.author;
  } else {
    isAuthor = null;
  }
  

  if (votingEndDate >= currentDate) {
    // 만료 X => 해당 투표 페이지 보여주기
    res.render('voting', {
      voting,
      isAuthor,
      status: true
    });
  } else {
    // 만료 => 결과
    res.render('voting', {
      voting,
      isAuthor,
      status: false
    });
  }
});

module.exports = router;
