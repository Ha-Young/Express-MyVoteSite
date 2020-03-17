const express = require('express');
const passport = require('passport');
const createError = require('http-errors');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('index', { hasLoggedIn: true });
  } else {
    res.render('index', { hasLoggedIn: false });
  }
});


router.post('/', (req, res, next) => {
  // res.render('index', { title: 'Express' });
});

module.exports = router;
