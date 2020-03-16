const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');

router.get('/', isLoggedIn, (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
