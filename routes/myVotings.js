const express = require('express');
const myPageController = require('../controller/myVotings.controller');
const { authCheck } = require('../middlewares/authCheck');

const router = express.Router();

router.get('/', authCheck, myPageController.getMyPage);

module.exports = router;
