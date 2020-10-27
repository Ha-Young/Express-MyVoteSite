const express = require('express');
const router = express.Router();
const { authenticate } = require('./middlewares/authenticate');
const votingController = require('./controllers/voting.controller');

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

router.get('/delete/:voting_id',
  votingController.deleteVote,
  (req, res, next) => {
    res.redirect('/');
});

router.get('/result/:voting_id',
  votingController.getTargetVote,
  (req, res, next) => {
    const targetDetails = req.targetVote;
    res.render('vote-result', { targetDetails });
});

router.get('/:voting_id',
  votingController.getTargetVote,
  votingController.checkValidVote,
  (req, res, next) => {
    const targetDetails = req.targetVote;
    const isIdsMatched = req.user
      ? targetDetails.writer._id.equals(req.user._id)
      : false;
    res.render('vote-details', { targetDetails, isIdsMatched });
});

router.post('/:voting_id',
  authenticate,
  votingController.updateVoteCount,
  (req, res, next) => {
    if (req.message) {
      // 조금 더 고민해보기
      req.flash('message', req.message);
    }
    res.redirect('/');
});

module.exports = router;
