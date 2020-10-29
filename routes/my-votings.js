const express = require('express');
const { authenticate } = require('./middlewares/authenticate');
const myVotingController = require('./controllers/my-votings.controller');
const router = express.Router();

router.get('/',
  authenticate,
  myVotingController.getAllMyVotes,
  myVotingController.renderMyVotings,
  );

module.exports = router;
