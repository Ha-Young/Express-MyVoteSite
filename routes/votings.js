const router = require('express').Router();

const votingsController = require('../controllers/votings.controller');
const authenticationHandler = require('../middlewares/authenticationHandler');

router
  .route('/new')
  .get(authenticationHandler.votes, votingsController.getVotingForm)
  .post(authenticationHandler.votes, votingsController.createVote);

router
  .route('/:id')
  .get(votingsController.getVotingPage)
  .post(authenticationHandler.votes, votingsController.voting)
  .delete(authenticationHandler.votes, votingsController.deleteVote);

module.exports = router;
