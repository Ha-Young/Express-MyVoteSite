const router = require('express').Router();

const votingsController = require('../controllers/votings.controller');
const authenticationHandler = require('../middlewares/authenticationHandler');
const validationHandler = require('../middlewares/validationHandler');

router
  .route('/new')
  .get(votingsController.getVotingForm)
  .post(votingsController.createVote);

router
  .route('/:id')
  .get(votingsController.getVotingPage)
  .post(authenticationHandler.votes, votingsController.voting)
  .delete(votingsController.deleteVote);

module.exports = router;
