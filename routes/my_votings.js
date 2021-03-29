const express = require('express');
const router = express.Router();
// const my_votingController = require('./controllers/my_voting.controller');
const { verifyUser } = require('../middlewares/verifyUser');

router.get('/', verifyUser);

module.exports = router;
