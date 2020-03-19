const express = require('express');

const { userValidationRules, validateUser } = require('../middlewares/validator');
const signupControllers = require('../controllers/signup.controllers');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('signup', {
    errorMessage: req.flash('Signup Error Message')
  });
});

router.post('/', userValidationRules(), validateUser, signupControllers.registerUser);

module.exports = router;
