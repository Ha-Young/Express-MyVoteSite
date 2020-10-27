const express = require('express');
const router = express.Router();

const signupController = require('./controllers/signup.controller');

router.get('/', signupController.renderSignUp);
router.post('/', signupController.verifyUser, signupController.createUser);

module.exports = router;
