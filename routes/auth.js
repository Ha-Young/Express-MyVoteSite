const express = require('express');
const authController = require('./controllers/auth.controller');
const {
  validateSignUp,
  validateLogin,
  checkVaildationError
} = require('./middlewares/authValidator');

const ROUTE_AUTH = require('../config/constants').ROUTE_AUTH;
const router = express.Router();

router.get(ROUTE_AUTH.SIGNUP, authController.getSignUp);
router.post(ROUTE_AUTH.SIGNUP, validateSignUp, checkVaildationError, authController.postSignUp);
router.get(ROUTE_AUTH.LOGIN, authController.getLogin);
router.post(ROUTE_AUTH.LOGIN, validateLogin, checkVaildationError, authController.postLogin);
router.get(ROUTE_AUTH.LOGOUT, authController.getLogout);

module.exports = router;
