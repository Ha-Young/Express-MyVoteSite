var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log('votings')
  res.render('vo');
});

module.exports = router;
