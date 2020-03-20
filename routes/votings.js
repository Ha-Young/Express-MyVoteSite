const express = require('express');
const authenticateLogin = require('./middlewares/authenticateLogin');
const votingsController = require('./controllers/votings.controller');
const preventVoteAgain = require('./middlewares/preventVoteAgain');
const rateLimit = require('./middlewares/blockToManyRequests');
const router = express.Router();

router.get(
  '/new', 
  rateLimit.blockTooManyRequests, 
  authenticateLogin, 
  votingsController.renderNewVoing
);

router.post(
  '/new', 
  rateLimit.blockTooManyRequests, 
  authenticateLogin, 
  votingsController.newVotePostHandler
);

router.get(
  '/success',
  rateLimit.blockTooManyRequests, 
  authenticateLogin, 
  votingsController.renderSuccess
  );

router.get(
  '/failure', 
  rateLimit.blockTooManyRequests, 
  authenticateLogin, 
  votingsController.renderFailure
);

router.get(
  '/:poll_id', 
  rateLimit.blockTooManyRequests, 
  votingsController.renderIndividualPoll
);

router.post(
  '/:poll_id',
  rateLimit.blockTooManyRequests,
  authenticateLogin, 
  preventVoteAgain, 
  votingsController.saveVotingResults
);

router.delete('/:poll_id', votingsController.deleteApoll);

module.exports = router;
