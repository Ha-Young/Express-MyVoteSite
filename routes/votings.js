const express = require('express');
const router = express.Router();

const Voting = require('../models/Voting');

router.get('/new', (req, res, next) => {
  //FIXME: 더 효율적인 방법으로 수정하기, 모달
  if (req.user) {
    res.render('newVoting');
  } else {
    res.redirect('/');
  }
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

  //해당 투표값
  const voting = await Voting.findOne({ _id: id });
  const votingEndDate = new Date(voting.endDate).getTime();
  const currentDate = new Date().getTime();
  const isAuthor = req.user.email === voting.author;

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

/*
  {
  solvedUser: [],
  _id: 5e7226e8cccc5f0c40549b8a,
  title: 'q',
  items: [
    { _id: 5e7226e8cccc5f0c40549b8b, name: 'q1', count: 0 },
    { _id: 5e7226e8cccc5f0c40549b8c, name: 'q2', count: 0 }
  ],
  endDate: '2020-03-26T01:01',
  author: 'bb@bb.com',
  __v: 0
}
*/
