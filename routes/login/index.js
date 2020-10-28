const express = require('express');

const controller = require('../../controller');
const {
  validateLoginForm,
  verifyEmailAndPassword,
  saveSession,
} = require('../../middleware');

const router = express.Router();

router.get(
  '/',
  controller.render('./login')
);

router.post(
  '/',
  validateLoginForm,
  verifyEmailAndPassword,
  saveSession,
  controller.redirectBefore()
);

module.exports = router;
