const express = require('express');
const myVotingRouter = express.Router();
const votingController = require('../controllers/voting.controller');
const { authenticateUser } = require('../middlewares/auth.middleware');

myVotingRouter.get('/',
  authenticateUser,
  votingController.getMyVoting
);

module.exports = myVotingRouter;
