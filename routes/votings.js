const express = require('express');
const router = express.Router();
const checkAuthenticated = require('./middlewares/autorization');
const { getTargetVoting } = require('./middlewares/votings');
const votingController = require('./controllers/voting.controller');

router.get('/new', votingController.getCreateForm);
router.post('/new', checkAuthenticated, votingController.create);
router.get('/:id', getTargetVoting, votingController.getVoteDetail);
router.put('/:id/', checkAuthenticated, getTargetVoting, votingController.updateVote);
router.delete('/:id/', checkAuthenticated, votingController.deleteVote);

module.exports = router;
