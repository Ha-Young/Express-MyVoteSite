const express = require('express');
const router = express.Router();
const { isNotLoggedIn } = require('./middlewares');

router.get('/', isNotLoggedIn, (req, res) => {
  res.render('join', {
    layout: 'layoutLogin',
    error: req.flash('joinError')
  });
});

module.exports = router;
