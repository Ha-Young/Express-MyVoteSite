const express = require('express');
const router = express.Router();
const authController = require('../api/controllers/authController');

router.get('/', authController.renderMainPage);
router.get('/signup', authController.renderSignup);
router.post('/signup', authController.registerUser);

router.get('/login', authController.renderLogin);
router.post('/login', authController.login);

router.get('/logout', authController.logout);

module.exports = router;
