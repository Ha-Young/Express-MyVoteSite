const express = require('express');
const router = express.Router();
const votingController = require('./controllers/voting.controller');
const { authenticate } = require('./middlewares/authenticate');
const { validateVotingInputs } = require('./middlewares/validation');

router.get('/new',
  authenticate,
  votingController.renderVotingRegister,
);

router.post('/new',
  validateVotingInputs,
  votingController.createNewVoting,
  (req, res, next) => {
    res.redirect('/');
});

router.get('/result/:voting_id',
  votingController.getTargetVoting,
  votingController.checkAuthorization,
);

router.get('/:voting_id',
  votingController.getTargetVoting,
  votingController.checkParticipatingVoting,
  votingController.renderVotingDetails,
);

router.put('/:voting_id',
  authenticate,
  votingController.updateVoteCount,
  votingController.responseSuccessResult,
);

router.delete('/:voting_id',
  votingController.deleteVoting,
  votingController.responseSuccessResult,
);

module.exports = router;
