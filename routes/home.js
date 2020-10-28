const express = require('express');

const controller = require('../controller');
const { getVotings, } = require('../middleware');

const router = express.Router();

router.get(
  '/',
  getVotings,
  controller.render('index')
);

module.exports = router;
