const express = require('express');
const router = express.Router();
const votingController = require('./controllers/voting.controller');

router.get('/', votingController.renderMyVotingsPage);

module.exports = router;
