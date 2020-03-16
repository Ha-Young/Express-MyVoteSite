const express = require('express');
const createError = require('http-errors')
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
/* GET home page. */

router.get('/', (req, res, next) => {
  res.render('index');
  // res.render('index', { title: 'Express' });
});


router.post('/', (req, res, next) => {
  // res.render('index', { title: 'Express' });
});

module.exports = router;
