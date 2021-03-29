const express = require('express');
const router = express.Router();
// const signupController = require('./controllers/signup.controller');

router.get('/', (req, res) => {
  res.render('signup')
});

module.exports = router;
