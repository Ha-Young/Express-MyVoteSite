const express = require('express');
const router = express.Router();

const {
  registerUser,
  handleLogin,
  handleLogout,
  renderLoginPage,
  renderRegisterPage,
} = require('../controllers/users.controllers');

const { forwardAuthenticated } = require('../config/authentication');

// Login Page
router.get('/login', forwardAuthenticated, renderLoginPage);

// Register Page
router.get('/register', forwardAuthenticated, renderRegisterPage);

// Register
router.post('/register', forwardAuthenticated, registerUser);

// Handle Login
router.post('/login', handleLogin);

// Handle Logout
router.get('/logout', handleLogout);

module.exports = router;
