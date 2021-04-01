const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const { signupSchema, loginSchema } = require('../middlewares/validateInput');

router.post('/login', loginSchema, controller.login);
router.post('/signup', signupSchema, controller.signup);

module.exports = router;
