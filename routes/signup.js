const express = require('express');

const router = express.Router();
const signupController = require('./controllers/signup.controller');
const validateSignupInput = require('./../lib/validateSignupInput');
const validateEmailDuplication = require('./../lib/validateEmailDuplication');

router.get('/', signupController.renderSignUp);
router.post(
  '/', 
  validateSignupInput, 
  validateEmailDuplication, 
  signupController.redirectMain
);

module.exports = router;
