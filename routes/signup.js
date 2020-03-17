const express = require('express');
const router = express.Router();

const signupControllers = require('./controllers/signup.controllers');

router.get('/', (req, res, next) => {
  res.render('signup');
});

router.post('/', signupControllers.validation);

module.exports = router;
