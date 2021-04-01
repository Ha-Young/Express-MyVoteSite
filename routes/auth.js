const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const { signupValidation, loginInputValidation } = require('../middlewares/validateInput');

router.post('/login', loginInputValidation, controller.login);
router.post('/signup', signupValidation, controller.signup);

module.exports = router;
