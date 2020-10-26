const express = require('express');
const router = express.Router();
const votingController = require('./controllers/voting.controller');

router.get('/new', votingController.renderNewVotingMakerPage);
router.post('/:id');
router.post('/options', votingController.addOption);
module.exports = router;
