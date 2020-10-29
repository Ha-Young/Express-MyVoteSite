const express = require('express');
const router = express.Router();
const signupController = require('./controllers/signup.controller');
const { isNotLoggedIn } = require('./middlewares/authenticate');
const { checkSignupValidation } = require('./middlewares/validation');

router.get('/', isNotLoggedIn, signupController.renderSignup);

router.post('/',
  checkSignupValidation,
  signupController.createNewUser,
  signupController.redirectToLogin,
);

module.exports = router;
