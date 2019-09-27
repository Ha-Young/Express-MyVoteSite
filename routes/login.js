const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', { message: req.flash("error") });
});

module.exports = router;