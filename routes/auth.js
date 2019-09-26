const express = require('express');
const router = express.Router();
const authController = require('./controllers/auth.controller');

router.post('/login', authController.login);
router.post('/join', authController.join);
router.get('/logout', authController.logout);

module.exports = router;
