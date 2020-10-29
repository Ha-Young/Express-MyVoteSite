const express = require('express');
const router = express.Router();
const validateSignupForm = require('./middlewares/validateSignupForm');
const { registerNewUser } = require('./controllers/userManagement.controller');

router.get('/', (req, res, next) => {
  res.status(200).render('signup');
});

router.post('/', validateSignupForm, registerNewUser);

module.exports = router;
