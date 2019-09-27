const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('join', { message: null, err: null });
});

module.exports = router;
