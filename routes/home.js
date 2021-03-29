const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    res.locals.user = req.user;
  }

  res.render('index');
});

module.exports = router;
