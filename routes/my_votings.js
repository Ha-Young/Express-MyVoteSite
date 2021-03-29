const express = require('express');
const router = express.Router();
const my_votingController = require('./controllers/my_voting.controller');

router.get('/', my_votingController.getProblems);

module.exports = router;
