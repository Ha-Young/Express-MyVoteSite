const express = require('express');
const router = express.Router();
const signupController = require('./controllers/signup.controller');
const {validationResult} = require('../middleware/validator');
router.get('/', signupController.renderSignup);
router.post('/', validationResult, signupController.signUp);

module.exports = router;
