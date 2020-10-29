const express = require('express');
const router = express.Router();
const signupController = require('./controllers/signup.controller');
const { isNotLoggedIn } = require('./middlewares/authenticate');
const { validateSignupInputs } = require('./middlewares/validation');

router.get('/', isNotLoggedIn, signupController.renderSignup);

router.post('/',
  validateSignupInputs,
  signupController.createNewUser,
  signupController.redirectToLogin,
);

module.exports = router;
