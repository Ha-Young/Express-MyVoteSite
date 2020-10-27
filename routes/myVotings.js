const express = require('express');
const router = express.Router();

const myVotingsController = require('../routes/controllers/myVotings.controller');
const { verifyLoggedIn } = require('./middlewares/auth');

router.get('/', verifyLoggedIn, myVotingsController.renderMyVotings);

module.exports = router;
