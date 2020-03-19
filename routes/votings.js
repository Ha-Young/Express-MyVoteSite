const express = require('express');

const router = express.Router();
const authenticateLogin = require('./middlewares/authenticateLogin');
const votingsController = require('./controllers/votings.controller');
const preventVoteAgain = require('./middlewares/preventVoteAgain');

router.get('/new', authenticateLogin, votingsController.renderNewVoing);
router.post('/new', votingsController.newVotePostHandler);
router.get('/success', authenticateLogin, votingsController.renderSuccess);
router.get('/failure', authenticateLogin, votingsController.renderFailure);
router.get('/:poll_id', votingsController.renderIndividualPoll);
router.post(
  '/:poll_id', 
  authenticateLogin, 
  preventVoteAgain, 
  votingsController.saveVotingResults
);
router.delete('/:poll_id', votingsController.deleteApoll);

module.exports = router;
