const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signup.controller');

router.get('/', signupController.getSignupPage);
router.post('/', signupController.singup);

module.exports = router;
