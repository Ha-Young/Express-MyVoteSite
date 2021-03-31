const express = require('express');
const router = express.Router();
const myVotingController = require('../controllers/my_votings.controller');
const { verifyUser } = require('../middlewares/verifyUser');

router.get('/', verifyUser, myVotingController.getMyVotings);

module.exports = router;
