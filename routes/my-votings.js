const express = require('express');
const router = express.Router();
const votingController = require('./controllers/voting.controller');
const { isLoggedIn } = require('../middleware/authorization');

router.get('/', isLoggedIn, votingController.renderMyVotingsPage);

module.exports = router;
