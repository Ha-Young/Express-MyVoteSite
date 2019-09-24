const express = require('express');
const router = express.Router();
const { isNotLoggedIn } = require('./middlewares');

router.get('/', isNotLoggedIn, (req, res, next) => {
  res.render('login', {
    title: '로그인',
    error: req.flash('loginError')
  });
});

module.exports = router;
