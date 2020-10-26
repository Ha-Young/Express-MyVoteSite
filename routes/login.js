const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).render('login');
});

router.post('/', (req, res, next) => {
  User.authenticate(req.body.email, req.body.password, (err, user) => {
    if (err || !user) {
      const error = new Error('Wrong email or password');
      error.status = 401;
      next(error);

      return;
    }

    req.session.userId = user._id;
    res.status(302).redirect('/');
  });
});

module.exports = router;
