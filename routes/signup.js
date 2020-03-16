const express = require('express');
const router = express.Router();

const { userValidationRules, validate } = require('../middlewares/validator');
const signupControllers = require('../controllers/signup.controllers');

router.get('/', (req, res) => {
  res.render('signup');
});

router.post('/', userValidationRules(), validate, signupControllers.registerUser);

module.exports = router;