const router = require('express').Router();
const { authCheck } = require('./middlewares/auth');
const Voting = require('../models/Voting');

router.get('/', authCheck, async (req, res, next) => {
  // 현재 로그인한 사용자가 만든 투표 목록이 보여야 합니다.
  // 전체 투표 목록(제목, 만료 날짜 및 시간, 진행 중 여부)이 보여야 합니다.
  // 투표를 클릭할 경우, /votings/:id로 이동합니다.
  const allVotings = await Voting.find();

  res.render('votings/index', {
    title: 'Express??',
    allVotings: allVotings
  });
});

router.get('/:id', authCheck, (req, res, next) => {
  // 현재 로그인한 사용자가 만든 투표 목록이 보여야 합니다.
  // 전체 투표 목록(제목, 만료 날짜 및 시간, 진행 중 여부)이 보여야 합니다.
  // 투표를 클릭할 경우, /votings/:id로 이동합니다.

  res.render('votings/voting', {
    title: 'The voting page',
    _id: req.params.id
  });
});

router.get('/new', authCheck, (req, res, next) => {
// 투표 제목, 투표 선택 사항, 만료 날짜 및 시간을 입력할 수 있어야 합니다.
// 투표 목록으로 돌아갈 수 있는 버튼이 있어야 합니다.
// 선택 사항은 반드시 2개 이상이어야 생성이 가능합니다.
// 투표를 생성하게 되면 메인 페이지의 전체 투표 목록에 반영되고 누구나 투표가 가능합니다.
// 투표 생성 직후 사용자는 메인 페이지로 이동합니다.
  res.render('votings/new', { title: 'lets create a new voting' });
});

router.post('/new', authCheck, async (req, res, next) => {
  // new voting create
  let expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 3);

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
    next(err);
  }
});

router.get('/success', authCheck, (req, res, next) => {

  res.render('votings/success', { title: 'success' });
});

router.get('/error', authCheck, (req, res, next) => {
// 투표 생성을 하지 못했다는 실패 메시지가 표기 되어야 합니다.
// 메인 페이지로 돌아갈 수 있는 버튼 혹은 링크가 있어야 합니다.
// 상세 에러 내용(Stack 정보 등)을 사용자에게 보여주어선 안됩니다.
  res.send('respond with a resource3');
});


module.exports = router;

//  votings
// - /votings/
// - /votings/:id
// - /votings/new
// - /votings/success
// - /votings/error
