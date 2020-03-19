const express = require('express');
const authenticateLogin = require('./middlewares/authenticateLogin');
const myVotingControl = require('./controllers/my-votings.controller');

const router = express.Router();

router.get('/', authenticateLogin, myVotingControl.displayMyVotings);

module.exports = router;
