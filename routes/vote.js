const express = require('express');
const voteController = require('../controllers/vote.controller');
const router = express.Router();

router.get('/', voteController.renderVote);

router.get('/new', voteController.renderNewVote);
router.post('/new', voteController.postNewVote);

module.exports = router;
