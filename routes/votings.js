const router = require('express').Router();
const { authCheck } = require('./middlewares/auth');
const Voting = require('../models/Voting');
const User = require('../models/User');
const renderMessage = require('../utils/renderMessage');

router.get('/', authCheck, async (req, res, next) => {
  const votings = await Voting.find();
  const allVotings = await Promise.all(votings.map(async voting => {
    if (toString(req.session.userId) === toString(voting.creator_id)) {
      const user = await User.findOne({ _id: voting.creator_id });
      const current = new Date();
      let status = 'Open';
      if (current > voting.expireDate) status = 'Closed';

      return {
        _id: voting._id,
        creator: user.email,
        title: voting.title,
        expire: voting.expireDate,
        status
      };
    }
  }));

  res.render('votings/index', { title: 'Your Votes', allVotings });
});

router.get('/new', authCheck, (req, res, next) => {
  res.render('votings/new', { title: 'A New Voting', message: '' });
});

router.post('/new', authCheck, async (req, res, next) => {
  if (!req.body.title) {
    renderMessage.votings(res, 'Please input title');
  } else if (!req.body.description) {
    renderMessage.votings(res, 'Please input description');
  } else if (!req.body.duration) {
    renderMessage.votings(res, 'Please input voting hours');
  } else if (!req.body.options || req.body.options.length < 1) {
    renderMessage.votings(res, 'You need at least two options');
  } else {
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + req.body.duration);

    try {
      const voting = new Voting({
        creator_id: req.session.userId,
        title: req.body.title,
        description: req.body.description,
        expireDate: expireDate
      });
      for (let i = 0; i < req.body.options.length; i++) {
        voting.options.addToSet({
          option: req.body.options[i],
          voters: []
        });
      }
      await voting.save();
      res.redirect('/votings/success');
    } catch(err) {
      res.redirect('/votings/error');
    }
  }
});

router.get('/success', authCheck, (req, res, next) => {
  res.render('success', {
    title: 'A New Voting',
    message: 'New Voting Created!'
  });
});

router.get('/error', authCheck, (req, res, next) => {
  res.render('errorPage', {
    title: 'A New Voting',
    message: 'Failed to create a new Voting'
  });
});

router.get('/:id', authCheck, async (req, res, next) => {
// 제목, 생성자, 만료 날짜 및 시간, 진행 중 여부, 투표 선택 사항들이 보여야 합니다.
// 투표 목록으로 돌아갈 수 있는 버튼이 있어야 합니다.
// 만료된 투표의 경우, 투표 결과를 표기해주어야 합니다. (가장 많은 선택을 받은 사항 표기)
// 진행 중인 투표의 경우, 누구든지 투표에 참여할 수 있어야 합니다. (AJAX 금지)
// 중복 투표는 불가능합니다.
// 만료되지 않은 투표는 투표를 하더라도 결과 확인이 불가능합니다.

// 단, 투표 생성자는 언제든지 투표 결과를 확인할 수 있습니다.
// 투표 생성자에게는 "삭제" 버튼이 보여야 합니다.
// 투표 생성자가 "삭제"할 경우, 더 이상 투표는 참가할 수 없습니다.
// 투표 생성자라 하더라도 이미 생성한 투표를 수정하는 것은 불가능합니다.
  const voting = await Voting.findOne({ _id: req.params.id });
  if (voting.creator_id === req.session.userId) {
    res.render('votings/votingAdmin', {
      title: 'The Admin voting page',
      _id: req.params.id
    });
  } else {
    res.render('votings/voting', {
      title: 'The voting page',
      _id: req.params.id
    });
  }
});

module.exports = router;
