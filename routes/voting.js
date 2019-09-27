const express = require('express');
const router = express.Router();
const votingController = require('./controller/voting.controller');
const { authorizeUser } = require('./middleware/authentication');

router.get('/', authorizeUser, votingController.getMyVotings);
router.get('/new', authorizeUser, votingController.renderVotingForm);
router.post('/new', authorizeUser, votingController.createVoting);

router.get('/success', authorizeUser, votingController.renderCreateSuccess);
router.get('/error', votingController.renderCreateError);

router.get('/:id', authorizeUser, votingController.updateVotingStatus, votingController.checkHasVoted, votingController.getVotingById);
router.post('/:id', authorizeUser, votingController.checkHasVoted, votingController.voteSelection);
router.delete('/:id', authorizeUser, votingController.deleteVoting);

module.exports = router;
