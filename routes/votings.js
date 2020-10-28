const express = require('express');
const router = express.Router();
const votingController = require('./controllers/voting.controller');
const { isLoggedIn } = require('../middleware/authorization');

router.get('/new', isLoggedIn, votingController.renderNewVotingMakerPage);
router.get('/:id', votingController.getVotingDetails);
router.put('/:id', isLoggedIn, votingController.vote);
router.delete('/:id', votingController.deleteVoting);

module.exports = router;
