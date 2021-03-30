var express = require('express');
var router = express.Router();

const { requireAuth } = require("./middleware/requireAuth");

/* GET home page. */
router.get('/', requireAuth, function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
