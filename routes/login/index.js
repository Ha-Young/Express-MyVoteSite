const express = require('express');

const controller = require('../../controller');
const bcryptPassword = require('../../middleware/bcryptPassword');
const validateLoginForm = require('../../middleware/validateLoginForm');
const verifyEmailAndPassword = require('../../middleware/verifyEmailAndPassword');
const saveSession = require('../../middleware/saveSession');

const router = express.Router();

router.get('/', controller.render('./login'));
router.post(
  '/',
  validateLoginForm,
  bcryptPassword,
  verifyEmailAndPassword,
  saveSession,
  controller.render('index')
);

module.exports = router;
