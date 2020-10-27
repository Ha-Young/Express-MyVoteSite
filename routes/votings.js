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
  authenticate,
  votingController.getTargetVote,
  (req, res, next) => {
    const targetDetails = req.targetVote;
    console.log(targetDetails);
    res.render('vote-result', { targetDetails });
});

// 투표 상세 페이지
router.get('/:voting_id',
  votingController.getTargetVote,
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
    res.redirect('/');
});

module.exports = router;
