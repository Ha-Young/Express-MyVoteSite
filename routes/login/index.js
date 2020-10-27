const express = require('express');

const controller = require('../../controller');
const validateLoginForm = require('../../middleware/validateLoginForm');
const verifyEmailAndPassword = require('../../middleware/verifyEmailAndPassword');
const saveSession = require('../../middleware/saveSession');

const router = express.Router();

router.get('/', controller.render('./login'));
router.post(
  '/',
  validateLoginForm,
  verifyEmailAndPassword,
  saveSession,
  controller.redirect('/')
);

module.exports = router;
