var express = require('express');
var router = express.Router();

// voting router
router.get('/', function(req, res, next) {
  res.render('voting');
});

router.get('/new', function(req, res, next) {
  res.render('new');
});

module.exports = router;
