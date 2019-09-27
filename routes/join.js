const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

/* GET home page. */
router.get('/', isNotLoggedIn, (req, res, next) => {
  res.render('join', { title: 'join' });
});

module.exports = router;
