const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/login', authController.getLoginPage);
router.get('/logout', authController.logout);
router.post('/login', authController.login);

module.exports = router;
