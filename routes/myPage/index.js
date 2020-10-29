const express = require('express');

const controller = require('../../controller');
const { authenticateUser, } = require('../../middleware');

const router = express.Router();

router.get(
  '/',
  authenticateUser,
  controller.myPage.getMyPage
);

module.exports = router;
