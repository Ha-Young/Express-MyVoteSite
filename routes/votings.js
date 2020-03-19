const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');
const { votingAuthorization } = require('../middlewares/votingAuthorization');
const _ = require('lodash');

router.get('/new', async (req, res, next) => {
  res.render('createVote');
});

router.post('/new', async (req, res, next) => {
  let { title, options, expirationDate } = req.body;
  const { _id, nickname } = req.user;

  options = options.map(option => ({
    optionTitle: option
  }));

  try {
    await Vote.create({
      title,
      options,
      creator: _id,
      creatorNickname: nickname,
      expirationDate
    });
  } catch (error) {
    console.log(error);
  }

  res.redirect('/');
})


// 로그인했을 때 이전 페이지로 돌아가는 로직
// 세션에 url 전체를 저장
// 미들웨어처럼 재사용성 높여보기

// 클라이언트 정보를 서버 측에서 가공해서 처리

router.get('/:vote_id', async (req, res, next) => {
  const { vote_id } = req.params;
  let { isParticipated } = res.locals;

  try {
    await Vote.findOne({ _id: vote_id })
    .exec((err, vote) => {
      if (req.user) {
        if (_.isEqual(vote.creator, req.user._id)) {
          res.render('creator', { vote });
        } else {
          res.render('vote', { vote, isParticipated });
        }
      } else {
        res.render('vote', { vote, isAnonymoususer: true });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/:vote_id', async (req, res, next) => {
  const { selected } = req.body;
  const { vote_id } = req.params;
  const participant = req.user._id;

  try {
    await Vote.updateOne({
      _id: vote_id,
      'options._id': selected
    }, {
      $inc: { 'options.$.count': 1 },
      $push: { participants: participant }
    });
  } catch (error) {
    console.log(error);
  }

  res.redirect('/');
});

router.delete('/:vote_id', async (req, res, next) => {
  const { vote_id } = req.params;

  try {
    await Vote.deleteOne({ _id: vote_id });
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
