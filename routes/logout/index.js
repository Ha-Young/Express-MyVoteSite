const express = require('express');

const controller = require('../../controller');
const { destroySession, } = require('../../middleware');

const router = express.Router();

router.get(
  '/',
  destroySession,
  controller.redirect('/')
);

module.exports = router;
