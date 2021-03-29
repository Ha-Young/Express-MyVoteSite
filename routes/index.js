const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  sess = req.session;
  res.render('main', {
    title: 'Voting Platform',
    message: sess.username
  });
});

module.exports = router;
