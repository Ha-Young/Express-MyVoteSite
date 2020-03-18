const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');

router.get('/new', async (req, res, next) => {
  res.render('createVote');
});

router.post('/new', async (req, res, next) => {
  let { title, options, expirationDate } = req.body;
  const { _id, nickname } = req.user;

  options = options.map(option => ({
    optionTitle: option
  }));

  await Vote.create({
    title,
    options,
    creator: _id,
    creatorNickname: nickname,
    expirationDate
  });

  res.redirect('/');
})


// 로그인했을 때 이전 페이지로 돌아가는 로직
// 세션에 url 전체를 저장
// 미들웨어처럼 재사용성 높여보기

// 클라이언트 정보를 서버 측에서 가공해서 처리

router.get('/:vote_id', async (req, res, next) => {
  const { vote_id } = req.params;
  const vote = await Vote.findOne({ _id: vote_id });

  res.render('vote', { vote });
});

router.post('/:vote_id', async (req, res, next) => {
  const { selected } = req.body;
  const participants = req.params.vote_id;

  await Vote.updateOne({
    _id: participants,
    "options._id": selected
  }, {
    $inc: { "options.$.count": 1 },
    $push: { participants }
  })

  res.redirect('/');
});

module.exports = router;
