const express = require('express');
const { authenticate } = require('./middlewares/authenticate');
const myVotingController = require('./controllers/my-votings.controller');
const router = express.Router();

router.get('/',
  authenticate,
  myVotingController.getAllMyVotings,
  myVotingController.renderMyVotings,
  );

module.exports = router;
