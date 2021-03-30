const express = require('express');
const authController = require('../controller/auth.controller');

const router = express.Router();

router.get('/signup', authController.signup);
router.post('/signup', authController.post);
router.get('/login', authController.login);
router.get('/login', authController.login);

module.exports = router;
