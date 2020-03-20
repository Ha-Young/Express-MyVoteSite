const express = require('express');
const signupController = require('./controllers/signup.controller');
const validateSignupInput = require('./../lib/validateSignupInput');
const validateEmailDuplication = require('./../lib/validateEmailDuplication');
const rateLimit = require('./middlewares/blockToManyRequests');
const router = express.Router();

router.get('/', rateLimit.blockTooManyRequests, signupController.renderSignUp);
router.post(
  '/',
  rateLimit.blockTooManyRequests,
  validateSignupInput,
  validateEmailDuplication,
  signupController.redirectMain
);

module.exports = router;
