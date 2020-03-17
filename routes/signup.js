const express = require('express');
const router = express.Router();

const { userValidationRules, validateUser } = require('../middlewares/validator');
const signupControllers = require('../controllers/signup.controllers');

router.get('/', (req, res) => {
  res.render('signup');
});

router.post('/', userValidationRules(), validateUser, signupControllers.registerUser);

module.exports = router;