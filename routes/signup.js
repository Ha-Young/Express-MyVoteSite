const express = require('express');
const router = express.Router();
const signupController = require('./controllers/signup.controller');
/* GET home page. */
router.get('/', signupController.renderSignup);
router.post('/', signupController.getInfo);
module.exports = router;
