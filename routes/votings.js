const express = require('express');
const router = express.Router();

const {
  renderNewVotingPage,
  createNewVote,
  renderSuccess,
  renderSpecificVoting,
  updateVoteSelectionAndVoter,
  deleteVote,
  showVotingResult } = require('./controller/votings.controller');

router.get('/new', renderNewVotingPage);
router.post('/new', createNewVote);

router.get('/success', renderSuccess);

router.get('/:id', renderSpecificVoting);
router.put('/:id', updateVoteSelectionAndVoter);
router.delete('/:id', deleteVote);

router.get('/:id/result', showVotingResult);


module.exports = router;
