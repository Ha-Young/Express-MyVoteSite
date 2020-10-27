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

router.get('/:voting_id',
  votingController.getTargetVote,
  (req, res, next) => {
    const targetDetails = req.targetVote;
    res.render('vote-details', { targetDetails });
});

router.post('/:voting_id',
  votingController.updateVoteCount,
  (req, res, next) => {
    res.send('오호');
});
module.exports = router;
