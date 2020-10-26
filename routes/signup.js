const express = require('express');
const router = express.Router();
const passport = require('../src/passport');

router.get('/', (req, res, next) => {
  res.status(200).render('signup');
});

router.post('/', (req, res, next) => {
  const { email, password } = req.body;
  const passwordConfirm = req.body['password-confirm'];

  console.log(email, password, passwordConfirm);
});

module.exports = router;
