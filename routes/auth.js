const express = require('express');
const authController = require('./controllers/auth.controller');
const {
  validateSignUp,
  validateLogin,
  checkVaildationError
} = require('./middlewares/authValidator');

const ROUTE_AUTH = require('../config/constants').ROUTE_AUTH;
const router = express.Router();

router.get(ROUTE_AUTH.SIGNUP, authController.renderSignUp);
router.post(ROUTE_AUTH.SIGNUP, validateSignUp, checkVaildationError, authController.signUpUser);
router.get(ROUTE_AUTH.LOGIN, authController.renderLogin);
router.post(ROUTE_AUTH.LOGIN, validateLogin, checkVaildationError, authController.loginUser);
router.get(ROUTE_AUTH.LOGOUT, authController.logoutUser);

module.exports = router;
