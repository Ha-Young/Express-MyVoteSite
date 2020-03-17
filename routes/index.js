const express = require('express');
const router = express.Router();

const { validator } = require('../middlewares/validator');
const signupController = require('../controllers/signup.Controller');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
})

router.post('/signup',
  validator,
  // signupController.passwordConfirmation,
  signupController.register, (req, res, next) => {
    res.redirect('/');
  }
);

module.exports = router;
