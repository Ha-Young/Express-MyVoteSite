const express = require('express');
const router = express.Router();
const passport = require('../src/passport');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
