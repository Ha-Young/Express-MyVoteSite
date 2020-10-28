const express = require('express');

const controller = require('../../controller');
const {
  validateSignupForm,
  saveUser,
  saveSession,
} = require('../../middleware');

const router = express.Router();

router.get(
  '/',
  controller.render('signup')
);

router.post(
  '/',
  validateSignupForm,
  saveUser,
  saveSession,
  controller.redirect('signup/success')
);

router.get(
  '/success',
  controller.render('signup/success')
);

module.exports = router;
