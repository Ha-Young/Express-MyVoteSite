const express = require('express');
const router = express.Router();
const votingController = require('./controllers/voting.controller');
const { isLoggedIn } = require('../middleware/authorization');

router.get('/new', isLoggedIn, votingController.renderNewVotingMakerPage);
router.post('/:id');
module.exports = router;
