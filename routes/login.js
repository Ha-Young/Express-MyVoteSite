const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('login', { message: req.flash("error") });
});

module.exports = router;