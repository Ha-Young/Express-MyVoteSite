const express = require('express');
const router = express.Router();
const { authenticate } = require('./middlewares/authenticate');
const votingController = require('./controllers/voting.controller');

// render 하는 부분도 모두 controller로 추가해버리기

router.get('/new', authenticate, (req, res, next) => {
  res.render('vote-register');
});

router.post('/new',
  votingController.validateInputs,
  votingController.createNewVote,
  (req, res, next) => {
    res.redirect('/');
});

router.get('/success', (req, res, next) => {
  res.send('success, new voting created');
});
router.get('/error', (req, res, next) => {
  res.send('error, new voting not created');
});

router.get('/result/:voting_id',
  votingController.getTargetVote,
  votingController.checkAuthorization,
);

router.get('/:voting_id',
  votingController.getTargetVote,
  votingController.checkValidVote,
  votingController.checkAuthorization,
);

// put으로 변경 - client 단에서 해결 처리 (fetch..)
// 왜 404 에러가 발생할까?
router.put('/:voting_id',
  authenticate,
  votingController.updateVoteCount,
  (req, res, next) => {
    if (req.message) {
      // 조금 더 고민해보기
      req.flash('message', req.message);
    }
    // res.redirect('/'); 왜 404 에러가 발생하는지
    res.json({ result: 'ok' });
});

// 404 error must handle
router.delete('/:voting_id',
  votingController.deleteVote,
  (req, res, next) => {
    // res.redirect('/');
    res.json({ result: 'ok' });
});

module.exports = router;
