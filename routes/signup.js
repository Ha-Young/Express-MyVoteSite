const express = require('express');
const router = express.Router();
const signupController = require('./controllers/signup.controller');
const { isNotLoggedIn } = require('./middlewares/authenticate');

router.get('/', isNotLoggedIn, signupController.renderSignup);

router.post('/',
  signupController.createNewUser,
  signupController.redirectToLogin,
);

module.exports = router;
