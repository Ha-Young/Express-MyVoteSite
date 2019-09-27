const router = require('express').Router();
const { authCheck } = require('./middlewares/auth');
const Voting = require('../models/Voting');
const User = require('../models/User');

router.get('/', authCheck, async (req, res, next) => {
  const votings = await Voting.find();
  const allVotings = await Promise.all(votings.map(async (voting) => {
    if (JSON.stringify(req.session.userId) === JSON.stringify(voting.creator_id)) {
      const user = await User.findOne({ _id: voting.creator_id });
      const userName = user.email;
      const current = new Date();
      let status = 'Open';
      if (current > voting.expireDate) status = 'Closed';

      return {
        _id: voting._id,
        creator: userName,
        title: voting.title,
        expire: voting.expireDate,
        status
      };
    }
  }));

  res.render('votings/index', { title: 'Your Votes', allVotings });
});

router.get('/new', authCheck, (req, res, next) => {
// 투표 제목, 투표 선택 사항, 만료 날짜 및 시간을 입력할 수 있어야 합니다.
// 투표 목록으로 돌아갈 수 있는 버튼이 있어야 합니다.
// 선택 사항은 반드시 2개 이상이어야 생성이 가능합니다.
// 투표를 생성하게 되면 메인 페이지의 전체 투표 목록에 반영되고 누구나 투표가 가능합니다.
// 투표 생성 직후 사용자는 메인 페이지로 이동합니다.
  res.render('votings/new', { title: 'A New Voting' });
});

router.post('/new', authCheck, async (req, res, next) => {
  if (req.body.title === undefined) {
    res.render('votings/new', {
      title: 'A New Voting',
      message: 'Please input title'
    });
  }
  if (req.body.description === undefined) {
    res.render('votings/new', {
      title: 'A New Voting',
      message: 'Please input description'
    });
  }
  if (req.body.duration === undefined) {
    res.render('votings/new', {
      title: 'A New Voting',
      message: 'Please input voting hours'
    });
  }
  if (req.body.options === undefined || req.body.options.length < 2) {
    res.render('votings/new', {
      title: 'A New Voting',
      message: 'You need at least two options'
    });
  }

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
});

router.get('/success', authCheck, (req, res, next) => {
  res.render('votings/success', { title: 'success' });
});

router.get('/error', authCheck, (req, res, next) => {
// 투표 생성을 하지 못했다는 실패 메시지가 표기 되어야 합니다.
// 메인 페이지로 돌아갈 수 있는 버튼 혹은 링크가 있어야 합니다.
// 상세 에러 내용(Stack 정보 등)을 사용자에게 보여주어선 안됩니다.
  res.render('votings/error', { title: 'failed to create a new voting'})
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
