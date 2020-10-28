const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const checkExpired = require('../controllers/middleware/checkExpired');
const isLoggedIn = require('../controllers/middleware/isLoggedIn');

router.get('/', checkExpired, authController.renderMainPage);
router.get('/signup', authController.renderSignup);
router.post('/signup', authController.registerUser);

router.get('/login', authController.renderLogin);
router.post('/login', authController.login);

// router.put('/login', authController.renderLogin);

router.get('/logout', authController.logout);

module.exports = router;