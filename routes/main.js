const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const sess = req.session;
  res.render('main', {
    username: sess.username,
  });
});

module.exports = router;
