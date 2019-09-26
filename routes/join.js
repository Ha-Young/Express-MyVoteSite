const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('join', { err: null });
});

module.exports = router;
