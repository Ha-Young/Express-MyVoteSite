const express = require('express');
const router = express.Router();

const myVotingsController = require('./controllers/my-votings.controller');
const { verifyLoggedIn } = require('./middlewares/auth');

router.get('/', verifyLoggedIn, myVotingsController.renderMyVotings);

module.exports = router;
