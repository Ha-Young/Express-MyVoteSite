var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // 조건을 검사한 후 렌더
  res.render('login');
});

module.exports = router;
