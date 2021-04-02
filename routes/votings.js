const router = require('express').Router();

const {
  getVotingForm,
  createVote,
  getVotingPage,
  voting,
  deleteVote
} = require('../controllers/votings.controller');
const { authenticateVotes } = require('../middlewares/authenticationHandler');

router
  .route('/new')
  .get(authenticateVotes, getVotingForm)
  .post(authenticateVotes, createVote);

router
  .route('/:id')
  .get(getVotingPage)
  .post(authenticateVotes, voting)
  .delete(authenticateVotes, deleteVote);

module.exports = router;
