const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { signupValidation, loginInputValidation } = require('../middlewares/validateInput');

router.post('/login', loginInputValidation, authController.login);
router.post('/signup', signupValidation, authController.signup);

module.exports = router;
