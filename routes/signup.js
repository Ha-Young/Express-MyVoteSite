const express = require('express');
const router = express.Router();
const signupController = require('./controllers/signup.controller');
const { isNotLoggedIn } = require('./middlewares/authenticate');

router.get('/', isNotLoggedIn, (req, res, next) => {
  res.render('signup');
});

router.post('/',
  signupController.createNewUser,
  (req, res, next) => {
    res.redirect('/login');
});

module.exports = router;
