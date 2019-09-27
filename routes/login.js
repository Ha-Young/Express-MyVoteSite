const express = require('express');
const router = express.Router();
const { isNotLoggedIn } = require('./middlewares');

router.get('/', isNotLoggedIn, (req, res, next) => {
  res.render('login', {
    layout: 'layoutLogin',
    error: req.flash('loginError')
  });
});

module.exports = router;
