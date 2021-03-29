const express = require('express');
const router = express.Router();
const signupController = require('./controllers/signup.controller');

router.get('/', signupController.getProblems);

module.exports = router;
