const express = require('express');

const router = express.Router();

router.get('/signup', function (req, res, next) {
  res.status(200).render('signup');
});

router.post('/signup', function (req, res, next) {});

router.get('/login', function (req, res, next) {
  res.status(200).render('login');
});

router.post('/login', function (req, res, next) {});

module.exports = router;
