const express = require('express');
const authController = require('./controllers/auth.controller');
const {
  validateSignUp,
  validateLogin,
  checkVaildationError
} = require('./middlewares/authValidator');

const router = express.Router();

router.get('/signup', authController.getSignUp);
router.get('/login', authController.getLogin);
router.get('/logout', authController.getLogout);
router.post('/login', validateLogin, checkVaildationError, authController.postLogin);
router.post('/signup', validateSignUp, checkVaildationError, authController.postSignUp);

module.exports = router;
