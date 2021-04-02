const router = require('express').Router();

const {
  getVotingForm,
  createVote,
  getVotingPage,
  voting,
  deleteVote
} = require('../controllers/votings.controller');
const { authenticateVotes } = require('../middlewares/authenticationHandler');
const { validateNewVote, validateVote } = require('../middlewares/validationHandler');

router
  .route('/new')
  .get(authenticateVotes, getVotingForm)
  .post(authenticateVotes, validateNewVote, createVote);

router
  .route('/:id')
  .get(getVotingPage)
  .post(authenticateVotes, validateVote, voting)
  .delete(authenticateVotes, deleteVote);

module.exports = router;
