const express = require('express');
const router = express.Router();
const { authenticate } = require('./middlewares/authenticate');
const { validateVotingInputs } = require('./middlewares/validation');
const votingController = require('./controllers/voting.controller');

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
  votingController.checkValidVoting,
  votingController.renderVotingDetails,
);

router.put('/:voting_id',
  authenticate,
  votingController.updateVoteCount,
  (req, res, next) => {
    res.status(200).json({ result: 'ok' });
});

router.delete('/:voting_id',
  votingController.deleteVoting,
  (req, res, next) => {
    res.status(200).json({ result: 'ok' });
});

module.exports = router;
