const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res, next) => {
  res.render('signup', { title: 'Sign Up' });
});

router.post('/', async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  // encrypting password should be added later

  const user = await User.create({
    username,
    password
  });

  // error => redirect to error page

  
  res.redirect('/login');
})

module.exports = router;
