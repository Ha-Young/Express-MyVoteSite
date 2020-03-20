const express = require('express');
const authenticateLogin = require('./middlewares/authenticateLogin');
const myVotingControl = require('./controllers/my-votings.controller');
const rateLimit = require('./middlewares/blockToManyRequests');
const router = express.Router();

router.get(
  '/', 
  authenticateLogin, 
  rateLimit.blockTooManyRequests, 
  myVotingControl.displayMyVotings
);

module.exports = router;
