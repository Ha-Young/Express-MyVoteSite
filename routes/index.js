var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log('홈 라우트')
  res.render('index');
});

module.exports = router;
