const express = require('express');
const router = express.Router();
const { isNotLoggedIn } = require('./middlewares');

/* GET home page. */
router.get('/', isNotLoggedIn, (req, res, next) => {
  res.render('join', {
    message: req.flash('joinError')
  });
});

module.exports = router;
