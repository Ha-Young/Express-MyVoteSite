const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const isAuthenticated = !!req.user;
  
  if (isAuthenticated) {
    res.locals.user = req.user._json;
  }

  res.render('index', {
    name: isAuthenticated ? req.user.username : 'Guest',
    isAuthenticated,
  });
});

module.exports = router;
