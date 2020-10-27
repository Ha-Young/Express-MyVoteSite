const express = require('express');

const controller = require('../controller');
const getVotings = require('../middleware/getVotings');
const getUserInfo = require('../middleware/getUserInfo');

const router = express.Router();

router.get('/',
  getVotings,
  getUserInfo,
  controller.render('index')
);

module.exports = router;
