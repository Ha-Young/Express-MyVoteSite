const express = require('express');
const router = express.Router();
const signupController = require('./controllers/signup.controller');
/* GET home page. */
router.get('/', signupController.renderSignup);
router.post('/', signupController.saveUser);
module.exports = router;
