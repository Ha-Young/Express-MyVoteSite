const express = require('express');
const router = express.Router();
const myVotingController = require('./controllers/my-votings.controller');
const { authenticate } = require('./middlewares/authenticate');

router.get('/',
  authenticate,
  myVotingController.getAllMyVotings,
  myVotingController.renderMyVotings,
);

module.exports = router;
