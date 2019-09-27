const express = require('express');
const router = express.Router();
const { forwardAuthenticated } = require('../config/authentication');
const {
  registerUser,
  handleLogin,
  handleLogout,
  renderLoginPage,
  renderRegisterPage,
} = require('../controllers/users.controllers');

router.get('/login', forwardAuthenticated, renderLoginPage);

router.get('/register', forwardAuthenticated, renderRegisterPage);

router.post('/register', forwardAuthenticated, registerUser);

router.post('/login', handleLogin);

router.get('/logout', handleLogout);

module.exports = router;
