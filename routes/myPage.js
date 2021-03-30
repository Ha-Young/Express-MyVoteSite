const express = require('express');
const myPageController = require('../controller/myPage.controller');

const router = express.Router();

router.get('/', myPageController.getMyPage);

module.exports = router;
